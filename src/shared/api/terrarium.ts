import { useState, useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { apiBaseQuery } from './api';
import { createApi } from '@reduxjs/toolkit/query/react';

interface profileCreationData {
    terId: string,
    name: string,
    settings: {
        temperature_hot_night: string,
        temperature_hot_day: string,
        light_start_time: string,
        light_stop_time: string
    }
}

export const terrariumApi = createApi({
    reducerPath: 'terrariumApi',
    baseQuery: apiBaseQuery,
    tagTypes: ['Profiles'],
    endpoints: (builder) => ({
        getTerrariums: builder.query<any, void>({
            query: () => 'terrarium',
            providesTags: (result) =>
                result ? result.terrariums.map(({ id }: { id: string }) => ({ type: 'Profiles', id })) : [],
        }),
        getTerrariumSettings: builder.query<any, string>({
            query: (linkId) => `terrarium/settings/${linkId}`,
            providesTags: (_result, _error, terrariumId) => [{ type: 'Profiles', id: terrariumId }],
        }),
        getLastTerrariumLogs: builder.query<any, { from: string; linkId: string }>({
            query: ({ from, linkId }) => `log?from=${from}&terId=${linkId}`,
        }),
        getLastTerrariumLog: builder.query<any, string>({
            query: (linkId) => `log/last?terId=${linkId}`,
        }),
        getProfiles: builder.query<any, string>({
            query: (terrariumId) => ({
                url: `profile?type=all&terId=${terrariumId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }),
        }),
        getTimezones: builder.query<any, void>({
            query: () => `terrarium/timezone`,
        }),
        createProfile: builder.mutation<any, profileCreationData>({
            query: (data) => ({
                url: 'profile',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: any) => ({
                profileId: response.profileId,
            }),
        }),
        setTerrariumProfile: builder.mutation<void, { terId: string; profileId: string }>({
            query: ({ terId, profileId }) => ({
                url: `terrarium/${terId}/profile/${profileId}`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, { terId }) => [{ type: 'Profiles', id: terId }],
        }),
        checkLinkId: builder.query<any, string>({
            query: (linkId) => `public/terrarium?linkId=${linkId}`,
        }),
        deleteTerrarium: builder.mutation<void, string>({
            query: (terId) => ({
                url: `user/terrarium/${terId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Profiles' }],
        }),
        createTerrarium: builder.mutation<any, string>({
            query: (linkId) => ({
                url: `user/terrarium?linkId=${linkId}`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Profiles' }],
        }),
        deleteTerrariumProfile: builder.mutation<void, string>({
            query: (terId) => ({
                url: `admin/terrarium/${terId}/profile`,
                method: 'DELETE',
            }),
        }),
        updateTimezone: builder.mutation<void, { newTimezone: string; terId: string }>({
            query: ({ newTimezone, terId }) => ({
                url: `terrarium/${terId}/timezone?newTimezone=${newTimezone}`,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _error, { terId }) => [{ type: 'Profiles', id: terId }],
        }),
        updateName: builder.mutation<void, { newName: string; terId: string }>({
            query: ({ newName, terId }) => ({
                url: `terrarium/${terId}/name?newName=${newName}`,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _error, { terId }) => [{ type: 'Profiles', id: terId }],
        }),
    }),
});


// Сheck link-id hook
export function useLinkIdChecker(linkId: string) {
    const { error, isLoading, isSuccess } = terrariumApi.useCheckLinkIdQuery(linkId, {
        skip: linkId.length !== 20,
    });

    return { 
        isLinkIdExist: isSuccess, 
        isLoading, 
        error 
    };
}

// Creation and connection to terrarium
export function useTerrariumProfile() {
    const navigate = useNavigate();
    const profile = useSelector((state: RootState) => state.customProfile);
    const [createProfile] = terrariumApi.useCreateProfileMutation();
    const [setTerrariumProfile] = terrariumApi.useSetTerrariumProfileMutation();

    const createTerrariumProfile = async () => {
        const data = {
            name: profile.name,
            terId: sessionStorage.getItem('terrariumId') || sessionStorage.getItem('terrariumToChange'),
            settings: {
                temperature_hot_night: profile.temperatureHotNight,
                temperature_hot_day: profile.temperatureHotDay,
                light_start_time: profile.startTime,
                light_stop_time: profile.endTime,
                humidity_max: profile.humidityDay,
                humidity_min: profile.humidityNight,
                temperature_cold_night: profile.temperatureColdNight,
                temperature_cold_day: profile.temperatureColdDay,
            },
        };

        try {
            const response = await createProfile(data).unwrap();
            await connectProfile(response.profileId);
        } catch (error) {
            console.error(error)
        }
    };

    const connectProfile = async (profileId: string) => {
        const terrariumId = sessionStorage.getItem('terrariumId') || sessionStorage.getItem('terrariumToChange');
        await setTerrariumProfile({ terId: terrariumId, profileId });

        if (sessionStorage.getItem('terrariumToChange')) {
            navigate(`/terrarium/${sessionStorage.getItem('terrariumToChange')}/settings`);
            sessionStorage.removeItem('terrariumToChange');
        } else {
            navigate('/terrarium_info');
        }
    };

    return { createTerrariumProfile };
}

/*Scanner hook*/
export function useQrScanner(onSuccess: (decodedText: string) => void) {
    const [isEnabled, setEnabled] = useState(false);

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 150, height: 150 } };
        const html5QrCode = new Html5Qrcode("qrCodeContainer");

        const qrScanerStop = () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => console.log("Scanner stopped"))
                    .catch(() => console.log("Scanner error"));
            }
        };
        const qrCodeErrorCallback = () => { };

        (isEnabled) ? html5QrCode.start({ facingMode: "environment" }, config, onSuccess, qrCodeErrorCallback) : qrScanerStop();

        return () => qrScanerStop();
    }, [isEnabled, onSuccess]);

    return { isEnabled, setEnabled };
}