import s from './create-custom-profile.module.css'

import { useState } from 'react'

import temperature from '../../../assets/temperature.svg'
import { Navbar } from '../../../shared/navbar/navbar';
import { createProfile } from '../../../shared/api'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../App'




function CustomProfileCreation() {
const navigate = useNavigate()

const createTerrariumProfile = async () => {
    const token = getToken('access');
    if (!token) {
            navigate('/login')
    };
    const data = {
        "name": sessionStorage.getItem('name'),
        "terId": sessionStorage.getItem('terrariumId') ? sessionStorage.getItem('terrariumId') : localStorage.getItem('terrariumToChange'),
         "settings": {
            "temperature_hot_night": temperatureHotNight,
            "temperature_hot_day": temperatureHotDay,
            "light_start_time": startTime,
            "light_stop_time": endTime,
            "humidity_max": humidityDay,
            "humidity_min": humidityNight,
            "temperature_cold_night": temperatureColdNight,
            "temperature_cold_day": temperatureColdDay,

        }
    }
    const response = await createProfile(token, data)
    if (response.ok) {
        navigate('/select_profile')
    }
  
  }
  const [temperatureHotNight, setTemperatureHotNight] = useState('')
  const [temperatureHotDay, setTemperatureHotDay] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [temperatureColdNight, setTemperatureColdNight] = useState('')
  const [temperatureColdDay, setTemperatureColdDay] = useState('')
  const [humidityDay, setHumidityDay] = useState('')
  const [humidityNight, setHumidityNight] = useState('')

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [counterDay, setCounterDay] = useState(0)
  const [counterNight, setCounterNight] = useState(0)


  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>
        <div className={s.burgerMenuIcon} onClick={toggleMenu}>
                <div className={s.burgerLine}></div>
                <div className={s.burgerLine}></div>
                <div className={s.burgerLine}></div>
              </div>

              {/* Навигационное меню */}
              <div className={`${s.leftMenu_side} ${menuOpen ? s.menuOpen : ''}`}>
                <div className={s.leftMenu_side_wrapper}>
                  <Navbar />
                </div>
              </div>
              {menuOpen && <div className={s.menuOverlay} onClick={toggleMenu}></div>}
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                        <div className={s.pageTitle}>
                            
                        </div>
                        <div  className={s.statisticCorrectMode}>
                            <div className={s.statisticCorrectMode_left}>
                                <div className={s.title_left}>
                                    <img src={temperature}></img>
                                    <p>Температура воздуха в верхнем углу</p>
                                </div>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input value={temperatureHotDay} onChange={(e) => {


                                                setTemperatureHotDay(e.target.value);

                                              
                                              // Если значение целое, добавляем ".0" в конце
                                            
                                            }} placeholder='36' maxLength={2} />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Ночь</p>
                                        <input value={temperatureHotNight} maxLength={2} onChange={(e) => {
                                            setTemperatureHotNight(e.target.value);

/*
                                        if (e.target.value.includes('.') || e.target.value === '') {
                                            setTemperatureHotNight(e.target.value);
                                        } else if (e.target.value.split('').length === 2) {
                                            setTemperatureHotNight( e.target.value + '.');
                                        } else {
                                            setTemperatureHotNight(e.target.value);

                                        }*/
                                        // Если значение целое, добавляем ".0" в конце

                                        }} placeholder='31' />
                                    </div>
                                </div>
                                <p className={s.input_left_second__title}>Нижний угол</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input value={temperatureColdDay} onChange={(e) => {
                                            setTemperatureColdDay(e.target.value);

                                            //   if (e.target.value.includes('.') || e.target.value === '') {
                                            //     setTemperatureColdDay(e.target.value);
                                            //   } else if (e.target.value.split('').length === 2) {
                                            //     setTemperatureColdDay( e.target.value + '.');
                                            //   } else {
                                            //     setTemperatureColdDay(e.target.value);

                                            //   }
                                              // Если значение целое, добавляем ".0" в конце
                                            
                                            }} placeholder='36' maxLength={2} />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Ночь</p>
                                        <input value={temperatureColdNight} maxLength={2} onChange={(e) => {

                                           setTemperatureColdNight(e.target.value);

                                        // if (e.target.value.includes('.') || e.target.value === '') {
                                        //     setTemperatureColdNight(e.target.value);
                                        // } else if (e.target.value.split('').length === 2) {
                                        //     setTemperatureColdNight( e.target.value + '.');
                                        // } else {
                                        //     setTemperatureColdNight(e.target.value);

                                        // }
                                        // Если значение целое, добавляем ".0" в конце

                                        }} placeholder='31' />
                                    </div>
                                </div>

                                <p className={s.input_left_second__title}>Влажность %</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>Минимум</p>
                                        <input value={humidityNight} onChange={(e) => {


                                              setHumidityNight(e.target.value)
                                            }} placeholder='31' maxLength={2} />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Максимум</p>
                                        <input value={humidityDay} maxLength={2} onChange={(e) => {
                                              setHumidityDay(e.target.value)

                                        }} placeholder='70' />
                                    </div>
                                </div>

                                <p className={s.input_left_second__title}>Ночной режим</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>Начало</p>
                                        <input value={startTime} maxLength={5} onChange={(e) => {


                                        if (e.target.value.includes(':') || e.target.value === '' || counterDay > 0) {
                                            setStartTime(e.target.value);
                                        } else if (e.target.value.split('').length === 2  && counterDay === 0) {

                                            setStartTime( e.target.value + ':');
                                            setCounterDay(1)

                                        } else {
                                            setStartTime(e.target.value);

                                        }

                                        }} placeholder='07:00' />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Конец</p>
                                        <input value={endTime} maxLength={5} onChange={(e) => {


                                        if (e.target.value.includes(':') || e.target.value === '' || counterNight > 0) {
                                            setEndTime(e.target.value);
                                        } else if (e.target.value.split('').length === 2 && counterNight === 0) {
                                            setEndTime( e.target.value + ':');
                                            setCounterNight(1)
                                        } else {
                                            setEndTime(e.target.value);
                                        }
                                        // Если значение целое, добавляем ".0" в конце

                                        }} placeholder='22:00' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  className={s.button_wrapper}>
                        <button onClick={() => {
                            createTerrariumProfile()
                        }} className={s.registrationForm_button}>Сохранить</button>
                                </div>
                      </div>

                </div>
        </div>

  </div>
  )
}

export default CustomProfileCreation
