import s from './terrarium-settings-info.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { terrariumApi } from '@/shared/api';

function TerrariumSettingsInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const terrariumId = location.pathname.split('/')[2];

  const { data: timezonesData, isLoading: isLoadingTimezones, isError: isErrorTimezones } = terrariumApi.useGetTimezonesQuery();
  const { data: terrariumData, isLoading: isLoadingTerrarium, isError: isErrorTerrarium } = terrariumApi.useGetTerrariumSettingsQuery(terrariumId);
  
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

  if (isLoadingTerrarium || isLoadingTimezones) return <p>Загрузка...</p>;
  if (isErrorTerrarium || isErrorTimezones) return <p>Ошибка загрузки данных</p>;

  return (
    <div className={s.registration_form}>
      <div className={s.registration_form_wrapper}>
        <div className={s.registration_form_fields}>
          <div className={s.registration_form_header} style={{ width: '400px', textAlign: 'center', height: '100px' }}>
            <h1 style={{ lineHeight: '33px' }}>НАСТРОЙКИ ТЕРРАРИУМА</h1>
          </div>

          <p className={s.label}>Переименовать питомца</p>
          <div className={s.registration_form_field}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={s.registration_form_field__input}
              placeholder="Имя питомца"
            />
          </div>

          <p className={s.label}>Выберите таймзону террариума</p>
          <div className={s.registration_form_field__password}>
            <select onChange={(e) => setTimezone(e.target.value)} className={s.registration_form_field__input} value={timezone}>
              <option value="">{timezone || 'Выберите таймзону'}</option>
              {timezones.map((item, index) => (
                <option key={index} value={item.split(' ')[0]}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={s.registration_form_button_wrapper}>
            <button onClick={handleSave} className={s.registration_form_button}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerrariumSettingsInfo;
