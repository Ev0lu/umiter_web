import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { terrariumApi, useValidation } from '@/shared/api';

/**
 * Hook to manage state and logic for TerrariumInfo component.
 * Handles fetching and formatting timezones, input state, validation, and updating terrarium info.
 */
export const useTerrariumInfoModel = () => {
  const navigate = useNavigate();

  const [timezones, setTimezones] = useState<string[]>([]);
  const [timezone, setTimezone] = useState<string>('');
  const [name, setName] = useState<string>('');

  const { errorFields, validateFields } = useValidation(['name', 'timezone']);
  const fieldValues = { name, timezone };

  const { data: dataTimezones } = terrariumApi.useGetTimezonesQuery();
  const [updateName] = terrariumApi.useUpdateNameMutation();
  const [updateTimezone] = terrariumApi.useUpdateTimezoneMutation();

  /**
   * Formats and sets the timezones state from the fetched data.
   */
  const getTimezone = () => {
    if (!dataTimezones) return;

    const formatTime = (zone: string, dateTime: string) => {
      const date = new Date(dateTime);
      const offset = dateTime.includes('Z') ? 'UTC+00:00' : `UTC${dateTime.slice(-6)}`;

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      return `${zone} ${formattedTime} ${offset}`;
    };

    const formattedTimezones = Object.entries(dataTimezones).map(([zone, dateTime]) =>
      formatTime(zone, dateTime as string)
    );
    setTimezones(formattedTimezones);
  };

  // Update timezones when data changes
  useEffect(() => {
    getTimezone();
  }, [dataTimezones]);

  /**
   * Saves the terrarium name and timezone after validation.
   */
  const handleSave = async () => {
    validateFields(fieldValues);
    if (name && timezone) {
      const terId = sessionStorage.getItem('terrariumToChange');
      if (!terId) return;

      try {
        await updateName({ newName: name, terId }).unwrap();
        await updateTimezone({ newTimezone: timezone, terId }).unwrap();
        sessionStorage.removeItem('terrariumToChange');
        navigate('/terrarium_list');
      } catch (error) {
        console.error('Error updating terrarium info:', error);
      }
    }
  };

  return {
    timezones,
    timezone,
    setTimezone,
    name,
    setName,
    errorFields,
    handleSave,
  };
};
