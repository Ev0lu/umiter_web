import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';
import { setField } from '@/app/store/reducers/customProfileReducer';
import { useTerrariumProfile } from '@/shared/api/terrarium';

/**
 * Hook to manage state and logic for CustomProfileCreation component.
 * Handles input changes with special formatting for time fields and triggers profile creation.
 */
export const useCustomProfileCreationModel = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.customProfile);

  const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);

  const { createTerrariumProfile } = useTerrariumProfile();

  // Counters to help auto-insert ':' in time inputs
  const [counterDay, setCounterDay] = useState(0);
  const [counterNight, setCounterNight] = useState(0);

  /**
   * Handles input changes in the form.
   * For 'startTime' and 'endTime' fields, auto-inserts ':' after two digits if not present.
   * Dispatches field updates to redux store.
   *
   * @param e - Change event from input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'startTime') {
      if (value.includes(':') || value === '' || counterDay > 0) {
        dispatch(setField({ field: name, value }));
      } else if (value.length === 2 && counterDay === 0) {
        dispatch(setField({ field: name, value: value + ':' }));
        setCounterDay(1);
      } else {
        dispatch(setField({ field: name, value }));
      }
    } else if (name === 'endTime') {
      if (value.includes(':') || value === '' || counterNight > 0) {
        dispatch(setField({ field: name, value }));
      } else if (value.length === 2 && counterNight === 0) {
        dispatch(setField({ field: name, value: value + ':' }));
        setCounterNight(1);
      } else {
        dispatch(setField({ field: name, value }));
      }
    } else {
      dispatch(setField({ field: name, value }));
    }
  };

  /**
   * Checks if all required profile fields are filled.
   */
  const isFormValid = () => {
    return (
      profile.name &&
      profile.temperatureHotNight &&
      profile.temperatureHotDay &&
      profile.startTime &&
      profile.endTime &&
      profile.temperatureColdNight &&
      profile.temperatureColdDay &&
      profile.humidityDay &&
      profile.humidityNight
    );
  };

  /**
   * Triggers creation of terrarium profile if form is valid.
   */
  const handleSave = () => {
    if (isFormValid()) {
      createTerrariumProfile();
    }
  };

  return {
    profile,
    menuOpen,
    handleChange,
    handleSave,
  };
};
