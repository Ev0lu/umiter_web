import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface customProfileState {
    name: string;
    temperatureHotNight: string;
    temperatureHotDay: string;
    startTime: string;
    endTime: string;
    temperatureColdNight: string;
    temperatureColdDay: string;
    humidityDay: string;
    humidityNight: string;
    counterDay: number;
    counterNight: number;
}

const initialState: customProfileState = {
    name: '',
    temperatureHotNight: '',
    temperatureHotDay: '',
    startTime: '',
    endTime: '',
    temperatureColdNight: '',
    temperatureColdDay: '',
    humidityDay: '',
    humidityNight: '',
    counterDay: 0,
    counterNight: 0
}

const customProfileReducer = createSlice({
    name: 'customProfile',
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ field: string, value: string }>) => {
            state[action.payload.field] = action.payload.value
        }
    },
})

export const { setField } = customProfileReducer.actions
export default customProfileReducer.reducer