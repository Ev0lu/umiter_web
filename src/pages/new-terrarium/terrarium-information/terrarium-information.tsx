import s from './terrarium-information.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getToken } from '../../../App'
import { getTimezones, updateName, updateTimezone } from '../../../shared/api'



function TerrariumInfo() {

    const navigate = useNavigate()
    const [timezones, setTimezones] = useState([])
    const [timezone, setTimezone] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [errorFields, setErrorFields] = useState({
        name: false,
        timezone: false,
    });

    const validateFields = () => {
        const errors = {
            name: name === '',
            timezone: timezone === '',
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };

    const getTimezone = async () => {
      const token = getToken('access');
      if (!token) {
          navigate('/login')
      };
      const response = await getTimezones(token)
      const data = await response.json()
      setTimezones(Object.entries(data))
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
                        <h1 style={{lineHeight: '33px'}}>ДОБАВЛЕНИЕ НОВОГО ТЕРРАРИУМА</h1>
                    </div>
                    <p style={{color: 'white', fontWeight: '600', fontFamily: 'Formular'}}>Назовите питомца</p>

                    <div className={s.registrationForm_field}>
                        <input value={name}
                        onChange={(e) => setName(e.target.value)} className={`${s.registrationForm_field__input} ${errorFields.name && s.error}`} placeholder='Имя питомца'></input>
                        {name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите имя</span>)}
                    </div>
                    <p style={{color: 'white', fontWeight: '600', fontFamily: 'Formular'}} >Введите текущее время</p>
                    <div className={s.registrationForm_field__password}>
                        <select onChange={(e) => setTimezone(e.target.value)} className={s.registrationForm_field__input}>
                          <option value=''>Выберите таймзону</option>
                          {timezones && timezones.map((item) => (

                             <option style={{width: '300px'}} value={`${item[0]}`}>{item[0]} {item[1]}</option>

                          ))}
                        </select>
                        <div className={s.password_form__bottom}>
                                { timezone === '' && (errorFields.timezone && <span className={s.error_message}>Пожалуйста, введите таймзону</span>)}
                        </div>

                    </div>    
                    <div className={s.registrationForm_button_wrapper}>
                            <button onClick={async () => {
                                validateFields()
                                if (name !== '' && timezone !== ''){
                                  const token = getToken('access');
                                  if (!token) {
                                      navigate('/login')
                                  };
                                  await updateName(name, sessionStorage.getItem('lastProfile'), token)
                                  await updateTimezone(timezone, sessionStorage.getItem('lastProfile'), token)

                                  navigate('/terrarium_list')

                                }
                            }} className={s.registrationForm_button}>Сохранить</button>
                    </div>
                </div>
      </div>
  </div>
  )
}

export default TerrariumInfo