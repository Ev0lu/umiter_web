import s from './TerrariumPage.module.css'

import { useState, useEffect } from 'react'

import night from '../../../assets/night.svg'
import settingsTerrarium from '../../../assets/settingsTerrarium.svg'
import pencil from '../../../assets/pencilUmiter.svg'
import leaf from '../../../assets/leaf.svg'

import temperature from '../../../assets/temperature.svg'
import wet from '../../../assets/wet.svg'
import down_big from '../../../assets/down_big.svg'
import { Navbar } from '../../../shared/navbar/navbar';
import { getLastTerrariumLog, getTerrariumSettings } from '../../../shared/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../../../App'




function TerrariumPage() {
  const [changeMode, setChangeMode] = useState(false)
  const handleChangeMode = () => {
    if (changeMode === true){
        setChangeMode(false)
    } else{
        setChangeMode(true)
    }
  }

    const [terrarium, setTerrarium] = useState<any>('');
    const location = useLocation()
    const navigate = useNavigate()

    const getTerrariums = async () => {  
        const token = getToken('access');
        if (!token) {
                navigate('/login')
        };
        const responseLog:any = await getLastTerrariumLog(location.pathname.split('/')[2], token)

        const responseSettings:any = await getTerrariumSettings(location.pathname.split('/')[2], token)
        const dataLog = await responseLog.json()

        console.log(dataLog,responseSettings)

        setTerrarium([dataLog, responseSettings])
    }
    useEffect(() => {
        getTerrariums()
    }, [])

  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>

                <Navbar />
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                        <div className={s.profileName}>
                            <img src=''></img>
                            <p>Инна Игнатьева</p>
                            <img src={down_big}></img>
                        </div>
                        <div className={s.pageTitle}>
                            <div className={s.leftSide}>
                                <h1>{terrarium ? terrarium[1].name : '-' }</h1>
                                <img src={pencil}></img>
                            </div>
                            <div className={s.rightSide}>
                                <h1>{terrarium ? terrarium[1].profileName : '-' }</h1>
                                <img onClick={handleChangeMode} src={settingsTerrarium}></img>
                            </div>
                            
                        </div>
                        <div style={{display: changeMode === true ? 'none' : ''}} className={s.statisticChangeMode}>
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
                                    <p>{terrarium ? `${terrarium[0].indicators.temperature_cold} - ${terrarium[0].indicators.temperature_hot}` : '-' } °C </p>
                                    <p className={s.bottomInscription}>{terrarium ? terrarium[1].settings.temperature_hot_night : '-'}-{terrarium ? terrarium[1].settings.temperature_hot_day : '-'}</p>
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
                                    <p>{terrarium ? `${terrarium[0].indicators.humidity_cold} - ${terrarium[0].indicators.humidity_hot}` : '-' } %</p>
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
                                    <p>{terrarium ? (terrarium[1].settings.light_start_time.split(':')[0] + ':' + terrarium[1].settings.light_start_time.split(':')[1] ) : '-'} {terrarium ? (terrarium[1].settings.light_stop_time.split(':')[0] + ':' + terrarium[1].settings.light_stop_time.split(':')[1] ) : '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: changeMode === true ? '' : 'none'}} className={s.statisticCorrectMode}>
                            <div className={s.statisticCorrectMode_left}>
                                <div className={s.title_left}>
                                    <img src={temperature}></img>
                                    <p>Температура воздуха</p>
                                </div>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input placeholder='asd' />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input placeholder='asd' />
                                    </div>
                                </div>
                                <p className={s.input_left_second__title}>Ночной режим</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input placeholder='asd' />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input placeholder='asd' />
                                    </div>
                                </div>
                            </div>
                            <div className={s.statisticCorrectMode_right}>
                                <div className={s.statistic_item}>
                                    <div className={s.statistic_item_title}>
                                        <img src={temperature}></img>
                                        <p>Влажность воздуха</p>
                                    </div>
                                    <div className={s.item_info_wrapper}>
                                        <div className={s.statistic_item_bottom}>
                                            <p className={s.statistic_item_bottom_titleText}>День</p>
                                            <p>24 %</p>
                                        </div>
                                        <div className={s.statistic_item_bottom}>
                                            <p className={s.statistic_item_bottom_titleText}>Ночь</p>
                                            <p>20 %</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.statistic_item}>
                                    <div className={s.statistic_item_title_second}>
                                        <img src={leaf}></img>
                                        <p>Влажность воздуха</p>
                                    </div>
                                    <div className={s.item_info_wrapper}>
                                        <div className={s.statistic_item_bottom}>
                                            <p className={s.statistic_item_bottom_titleText}>День</p>
                                            <p>24 pH</p>
                                        </div>
                                        <div className={s.statistic_item_bottom}>
                                            <p className={s.statistic_item_bottom_titleText}>Ночь</p>
                                            <p>24 pH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                      <div style={{display: changeMode === true ? '' : 'none'}} className={s.button_wrapper}>
                        <button className={s.registrationForm_button}>Сохранить</button>
                                </div>
                </div>
        </div>

  </div>
  )
}

export default TerrariumPage
