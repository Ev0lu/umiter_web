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

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    };


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
                        <div className={s.profileName}>
                            <img src=''></img>
                            <p>{userName.length > 7 ? userName.slice(0, 7) + '...' : userName}</p>
                            <img src={down_big}></img>
                        </div>
                        <div className={s.pageTitle}>
                            <div className={s.leftSide}>
                                <h1>{terrarium.length > 0 ? terrarium[1].name.length > 7 ? terrarium[1].name.slice(0, 7) + '...' : terrarium[1].name : '-' }</h1>
                                {/* <img src={pencil}></img> */}
                            </div>
                            <div className={s.rightSide}>
                                <h1>{terrarium.length > 0 ? terrarium[1].profileName.length > 12 ? terrarium[1].profileName.slice(0, 12) + '...' : terrarium[1].profileName : '-' }</h1>
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
                                        <p>Диапазон температур в нижнем углу</p>
                                    </div>
                                    <div className={s.statistic_bottom_sign}>
                                        <p>Диапазон температур в верхнем углу</p>
                                    </div>
                                </div>
                                 
                                <div className={s.statistic_right}>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ? `${terrarium[0].indicators.temperature_cold} - ${terrarium[0].indicators.temperature_hot}` : '-' } °C </p>
                                    <p className={s.bottomInscription}>{terrarium.length > 0 ? terrarium[1].settings.temperature_cold_night : '-'}-{terrarium.length > 0 ? terrarium[1].settings.temperature_cold_day : '-'}°C</p>
                                    <p className={s.bottomInscription}>{terrarium.length > 0 ? terrarium[1].settings.temperature_hot_night : '-'}-{terrarium.length > 0 ? terrarium[1].settings.temperature_hot_day : '-'}°C</p>

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
                                    <p className={s.bottomInscription}>{terrarium.length > 0 ? terrarium[1].settings.humidity_min : '-'}-{terrarium.length > 0 ? terrarium[1].settings.humidity_max : '-'}%</p>                                </div>
                            </div>
                            <div className={s.statistic}>
                                <div className={s.statistic_left}>
                                    <div className={s.statistic_top_sign}>
                                        <img src={night}></img>
                                        <p>Ночной режим</p>
                                    </div>
                                </div>
                                <div className={s.statistic_right}>
                                    <p className={s.time}>{terrarium.length > 0  ? (terrarium[1].settings.light_start_time.split(':')[0] + ':' + terrarium[1].settings.light_start_time.split(':')[1] ) : '-'} {terrarium.length > 0 ? (terrarium[1].settings.light_stop_time.split(':')[0] + ':' + terrarium[1].settings.light_stop_time.split(':')[1] ) : '-'}</p>
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
