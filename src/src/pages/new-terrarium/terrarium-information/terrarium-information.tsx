import s from './terrarium-information.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useValidation, terrariumApi } from '@/shared/api';

function TerrariumInfo() {
  const navigate = useNavigate()
  const [timezones, setTimezones] = useState([])
  const [timezone, setTimezone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const { errorFields, validateFields } = useValidation(['name', 'timezone']);
  const fieldValues = { name, timezone };
  const {data: dataTimezones, error: _errorTimezones, isLoading: _loadingTimezones} = terrariumApi.useGetTimezonesQuery()
  const [updateName, {}] = terrariumApi.useUpdateNameMutation()
  const [updateTimezone, {}] = terrariumApi.useUpdateTimezoneMutation()

  const getTimezone = async () => {
    const formatTime = (zone, dateTime) => {
      const date = new Date(dateTime);
      const offset = dateTime.includes('Z') ? 'UTC+00:00' : `UTC${dateTime.slice(-6)}`;

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      return `${zone} ${formattedTime} ${offset}`;
    };
    const formattedTimezones = Object.entries(dataTimezones).map(([zone, dateTime]) => formatTime(zone, dateTime));
    setTimezones(formattedTimezones);
  }

  useEffect(() => {
    getTimezone()
  }, [dataTimezones])

  return (
    <div className={s.registration_form}>
      <div className={s.registration_form_wrapper}>
        <div className={s.registration_form_fields}>
          <div style={{ width: '400px', textAlign: 'center', height: '100px' }} className={s.registration_form_header}>
            <h1 style={{ lineHeight: '33px' }}>ДОБАВЛЕНИЕ НОВОГО ТЕРРАРИУМА</h1>
          </div>
          <p style={{ color: 'white', fontWeight: '600', fontFamily: 'Formular' }}>Назовите питомца</p>
          <div className={s.registration_form_field}>
            <input value={name}
              onChange={(e) => setName(e.target.value)} className={`${s.registration_form_field__input} ${errorFields.name && s.error}`} placeholder='Имя питомца'></input>
            {name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите имя</span>)}
          </div>
          <p style={{ color: 'white', fontWeight: '600', fontFamily: 'Formular' }} >Введите текущее время</p>
          <div className={s.registration_form_field__password}>
            <select onChange={(e) => setTimezone(e.target.value)} className={s.registration_form_field__input}>
              <option value=''>Выберите таймзону</option>
              {timezones && timezones.map((item) => (
                <option style={{ width: '300px' }} value={`${item.split(' ')[0]}`}>{item}</option>
              ))}
            </select>
          </div>
          <div className={s.registration_form_button_wrapper}>
            <button onClick={async () => {
              validateFields(fieldValues)
              if (name && timezone) {
                await updateName({newName: name, terId: sessionStorage.getItem('terrariumToChange')})
                await updateTimezone({newTimezone: timezone, terId: sessionStorage.getItem('terrariumToChange')})
                sessionStorage.removeItem('terrariumToChange');
                navigate('/terrarium_list')
              }
            }} className={s.registration_form_button}>Сохранить</button>
          </div>
        </div>                         
      </div>
    </div>
  )
}

export default TerrariumInfo