import { useState, useEffect } from 'react';
import { terrariumApi } from '@/shared/api';
import { useLocation, useNavigate } from 'react-router-dom';

export const useTerrariumSettingsInfoModel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const terrariumId = location.pathname.split('/')[2];

  const {
    data: timezonesData,
    isLoading: isLoadingTimezones,
    isError: isErrorTimezones,
  } = terrariumApi.useGetTimezonesQuery();

  const {
    data: terrariumData,
    isLoading: isLoadingTerrarium,
    isError: isErrorTerrarium,
  } = terrariumApi.useGetTerrariumSettingsQuery(terrariumId);

  const [updateName] = terrariumApi.useUpdateNameMutation();
  const [updateTimezone] = terrariumApi.useUpdateTimezoneMutation();

  const [timezones, setTimezones] = useState<string[]>([]);
  const [timezone, setTimezone] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (timezonesData) {
      const formatTime = (zone: string, dateTime: string) => {
        const time = dateTime.split('T')[1].split(':').slice(0, 2).join(':');
        const offset = dateTime.includes('Z') ? 'UTC+00:00' : `UTC${dateTime.slice(-6)}`;
        return `${zone} ${time} ${offset}`;
      };

      const formattedTimezones = Object.entries(timezonesData).map(([zone, dateTime]) =>
        formatTime(zone, dateTime as string)
      );

      setTimezones(formattedTimezones);
    }
  }, [timezonesData]);

  useEffect(() => {
    if (terrariumData) {
      setName(terrariumData.name || '');
      setTimezone(terrariumData.timezone || '');
    }
  }, [terrariumData]);

  const handleSave = async () => {
    try {
      if (name) await updateName({ terId: terrariumId, newName: name }).unwrap();
      if (timezone) await updateTimezone({ terId: terrariumId, newTimezone: timezone }).unwrap();
      sessionStorage.removeItem('terrariumToChange');
      navigate('/terrarium_list');
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

  return {
    terrariumId,
    timezones,
    timezone,
    setTimezone,
    name,
    setName,
    handleSave,
    isLoading: isLoadingTerrarium || isLoadingTimezones,
    isError: isErrorTerrarium || isErrorTimezones,
  };
};
