import s from './terrarium-page.module.css'

import { useState, useEffect } from 'react'

import night from '../../../assets/night.svg'
import settingsTerrarium from '../../../assets/settingsTerrarium.svg'
{/*import pencil from '../../../assets/pencilUmiter.svg'*/}
import temperature from '../../../assets/temperature.svg'
import wet from '../../../assets/wet.svg'
import down_big from '../../../assets/down_big.svg'
import { Navbar } from '../../../shared/navbar/navbar';
import { getLastTerrariumLog, getTerrariumSettings, getUserInfo } from '../../../shared/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../../../App'




function TerrariumPage() {
const [userName, setUserName] = useState('')
const [terrarium, setTerrarium] = useState<any>([]);
const location = useLocation()
const navigate = useNavigate()

const getTerrarium = async () => {  
    const token = getToken('access');
    if (!token) {
            navigate('/login')
    };
    const responseLog:any = await getLastTerrariumLog(location.pathname.split('/')[2], token)

    const responseSettings:any = await getTerrariumSettings(location.pathname.split('/')[2], token)
    if (responseLog.ok) {
        const dataLog = await responseLog.json()
        setTerrarium([dataLog, responseSettings])
    } else {
        setTerrarium(['null', responseSettings])
    }
}

const getUserName = async () => {
    const token = getToken('access');
    if (!token) {
            navigate('/login')
    };

    const response = await getUserInfo(token)
    const data = await response.json()
    console.log(data)
    setUserName(data.name)
  }

useEffect(() => {
    getUserName()
    getTerrarium()
}, [])

  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>

                <Navbar />
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                        <div className={s.profileName}>
                            <img src=''></img>
                            <p>{userName}</p>
                            <img src={down_big}></img>
                        </div>
                        <div className={s.pageTitle}>
                            <div className={s.leftSide}>
                                <h1>{terrarium.length > 0 ? terrarium[1].name : '-' }</h1>
                                {/* <img src={pencil}></img> */}
                            </div>
                            <div className={s.rightSide}>
                                <h1>{terrarium.length > 0 ? terrarium[1].profileName : '-' }</h1>
                                <img onClick={() => navigate('settings')} src={settingsTerrarium}></img>
                            </div>
                            
                        </div>
                        <div className={s.statisticChangeMode}>
                            <div className={s.statistic}>
                                <div className={s.statistic_left}>
                                    <div className={s.statistic_top_sign}>
                                        <img src={temperature}></img>
                                        <p>Воздух</p>
                                    </div>
                                    <div className={s.statistic_bottom_sign}>
                                        <p>Диапазон температур</p>
                                    </div>
                                </div>
                                 
                                <div className={s.statistic_right}>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ? `${terrarium[0].indicators.temperature_cold} - ${terrarium[0].indicators.temperature_hot}` : '-' } °C </p>
                                    <p className={s.bottomInscription}>{terrarium.length > 0 ? terrarium[1].settings.temperature_hot_night : '-'}-{terrarium.length > 0 ? terrarium[1].settings.temperature_hot_day : '-'}</p>
                                </div>
                                
                            </div>
                            <div className={s.statistic}>
                                <div className={s.statistic_left}>
                                    <div className={s.statistic_top_sign}>
                                        <img src={wet}></img>
                                        <p>Влажность</p>
                                    </div>
                                    <div className={s.statistic_bottom_sign}>
                                        <p>Диапазон допустимой влажности в %</p>
                                    </div>
                                </div>
                                <div className={s.statistic_right}>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ?  `${terrarium[0].indicators.humidity_cold} - ${terrarium[0].indicators.humidity_hot}` : '-' } %</p>
                                    <p className={s.bottomInscription}>0-100%</p>
                                </div>
                            </div>
                            <div className={s.statistic}>
                                <div className={s.statistic_left}>
                                    <div className={s.statistic_top_sign}>
                                        <img src={night}></img>
                                        <p>Ночной режим</p>
                                    </div>
                                </div>
                                <div className={s.statistic_right}>
                                    <p>{terrarium.length > 0  ? (terrarium[1].settings.light_start_time.split(':')[0] + ':' + terrarium[1].settings.light_start_time.split(':')[1] ) : '-'} {terrarium.length > 0 ? (terrarium[1].settings.light_stop_time.split(':')[0] + ':' + terrarium[1].settings.light_stop_time.split(':')[1] ) : '-'}</p>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
        </div>
  </div>
  )
}

export default TerrariumPage
