import s from './create-custom-profile.module.css'

import { useState } from 'react'

import temperature from '../../assets/temperature.svg'
import { Navbar } from '../../shared/navbar/navbar';
import { createProfile } from '../../shared/api'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../App'




function CustomProfileCreation() {
const navigate = useNavigate()

const createTerrariumProfile = async () => {
    const token = getToken('access');
    if (!token) {
            navigate('/login')
    };
    const data = {
        "name": sessionStorage.getItem('name'),
        "terId": sessionStorage.getItem('terrariumId'),
         "settings": {
            "temperature_hot_night": temperatureHotNight,
            "temperature_hot_day": temperatureHotDay,
            "light_start_time": startTime,
            "light_stop_time": endTime
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

  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>

                <Navbar />
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                        <div className={s.pageTitle}>
                            
                        </div>
                        <div  className={s.statisticCorrectMode}>
                            <div className={s.statisticCorrectMode_left}>
                                <div className={s.title_left}>
                                    <img src={temperature}></img>
                                    <p>Температура воздуха</p>
                                </div>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input value={temperatureHotDay} onChange={(e) => setTemperatureHotDay(e.target.value)} placeholder='36.8' />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Ночь</p>
                                        <input value={temperatureHotNight} onChange={(e) => setTemperatureHotNight(e.target.value)} placeholder='31.0' />
                                    </div>
                                </div>
                                <p className={s.input_left_second__title}>Ночной режим</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>Начало</p>
                                        <input value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder='12:00' />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Конец</p>
                                        <input value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder='22:00' />
                                    </div>
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
  )
}

export default CustomProfileCreation
