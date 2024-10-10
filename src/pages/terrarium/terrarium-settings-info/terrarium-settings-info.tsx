import s from './terrarium-settings-info.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getToken } from '../../../App'
import { getTimezones, updateName, updateTimezone } from '../../../shared/api'



function TerrariumSettingsInfo() {
    const location = useLocation()
    const navigate = useNavigate()
    const [timezones, setTimezones] = useState([])
    const [timezone, setTimezone] = useState<string>('');
    const [name, setName] = useState<string>('');

    const getTimezone = async () => {
      const token = getToken('access');
      if (!token) {
          navigate('/login')
      };
      const response = await getTimezones(token)
      const data = await response.json()
      console.log(data)
      const formatTime = (zone, dateTime) => {
        // Получаем только время (часы и минуты)
        const time = dateTime.split('T')[1].split(':').slice(0, 2).join(':');
      
        // Получаем смещение
        const offset = dateTime.includes('Z') ? 'UTC+00:00' : `UTC${dateTime.slice(-6)}`;
      
        return `${zone} ${time} ${offset}`;
    };

      const formattedTimezones = Object.entries(data).map(([zone, dateTime]) => formatTime(zone, dateTime));
      // Установка состояния
      setTimezones(formattedTimezones);

    }

    useEffect(() => {
      getTimezone()
    }, [])
    

  return (
  <div className={s.registrationForm}>
      <div className={s.registrationForm_wrapper}>

                <div className={s.registrationForm_fields}>
                    <div style={{width: '400px', textAlign: 'center', height: '100px'
                    }} className={s.registrationForm_header}>
                        <h1 style={{lineHeight: '33px'}}>НАСТРОЙКИ ТЕРРАРИУМА</h1>
                    </div>
                    <p style={{color: 'white', fontWeight: '600', fontFamily: 'Formular'}}>Переименовать питомца</p>

                    <div className={s.registrationForm_field}>
                        <input value={name}
                        onChange={(e) => setName(e.target.value)} className={`${s.registrationForm_field__input}`} placeholder='Имя питомца'></input>
                    </div>
                    <p style={{color: 'white', fontWeight: '600', fontFamily: 'Formular'}} >Введите текущее время</p>
                    <div className={s.registrationForm_field__password}>
                        <select onChange={(e) => setTimezone(e.target.value)} className={s.registrationForm_field__input}>
                          <option value=''>Выберите таймзону</option>
                          {timezones && timezones.map((item) => (

                          <option style={{width: '300px'}} value={`${item.split(' ')[0]}`}>{item}</option>

                          ))}
                        </select>
    

                    </div>    
                    <div className={s.registrationForm_button_wrapper}>
                            <button onClick={async () => {
                                  const token = getToken('access');
                                  if (!token) {
                                      navigate('/login')
                                  };
                                  if (name !== '') {
                                    await updateName(name, location.pathname.split('/')[2], token)
                                  }
                                  if (timezone !== '') {
                                    await updateTimezone(timezone, location.pathname.split('/')[2], token)
                                  }
                                  navigate('/terrarium_list')
                            }} className={s.registrationForm_button}>Сохранить</button>
                    </div>
                </div>
      </div>
  </div>
  )
}

export default TerrariumSettingsInfo