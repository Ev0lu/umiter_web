import s from './terrarium-page.module.css'
import layout from '@/shared/styles/layout.module.css';
import { useState, useEffect } from 'react'
import { night, settingsTerrarium, temperature, wet, down_big } from '@/shared/assets/imageAssets';
import { Navbar } from '@/shared/navbar/navbar';
import { terrariumApi } from '@/shared/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';
import { userApi } from '@/shared/api/user';

function TerrariumPage() {
    const [terrarium, setTerrarium] = useState<any>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);

    const { data: userData, error: userError, isLoading: userLoading } = userApi.useGetUserInfoQuery();
    const { data: logData, error: _logError, isLoading: logLoading } = terrariumApi.useGetLastTerrariumLogQuery(location.pathname.split('/')[2])
    const { data: settingsData, error: settingsError, isLoading: settingsLoading } = terrariumApi.useGetTerrariumSettingsQuery(location.pathname.split('/')[2])

    useEffect(() => {
        (logData) ? setTerrarium([logData, settingsData]) : setTerrarium(['null', settingsData]);
    }, [settingsData, logData]);

    if (userLoading || logLoading || settingsLoading) return <div>Loading user info...</div>;

    if (userError || settingsError) return <div>Error fetching user info</div>;

    return (
        <div className={s.new_terrarium_form}>
            <div className={s.new_terrarium_form_wrapper}>
                <BurgerMenu />
                <div className={`${layout.leftMenu_side} ${menuOpen ? layout.menuOpen : ''}`}>
                    <div className={layout.leftMenu_side_wrapper}>
                        <Navbar />
                    </div>
                </div>
                <div className={s.right_side}>
                    <div className={s.right_side_wrapper}>
                        <div className={s.profileName}>
                            <img src=''></img>
                            <p>{userData?.name}</p>
                            <img src={down_big}></img>
                        </div>
                        <div className={s.pageTitle}>
                            <div className={s.leftSide}>
                                <h1>{terrarium.length > 0 ? terrarium[1]?.name.length > 7 ? terrarium[1]?.name.slice(0, 7) + '...' : terrarium[1]?.name : '-'}</h1>
                                {/* <img src={pencil}></img> */}
                            </div>
                            <div className={s.rightSide}>
                                <h1>{terrarium.length > 0 ? terrarium[1]?.profileName : '-'}</h1>
                                <img onClick={() => navigate('settings')} src={settingsTerrarium}></img>
                            </div>
                        </div>
                        <div className={s.statisticChangeMode}>
                            <div className={s.statistic}>
                                <div className={s.statistic_row_main}>
                                    <img src={temperature} alt="Temperature Icon" />
                                    <p>Воздух</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Нижний угол</p>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ? `${terrarium[0]?.indicators.temperature_cold[0]}${terrarium[0]?.indicators.temperature_cold[1]}` : '-'} °C</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Верхний угол</p>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ? `${terrarium[0]?.indicators.temperature_hot[0]}${terrarium[0]?.indicators.temperature_hot[1]}` : '-'} °C</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Диапазон температур</p>
                                    <p>{terrarium.length > 0 ? `${terrarium[1]?.settings.temperature_cold_night}-${terrarium[1]?.settings.temperature_hot_day}` : '-'} °C</p>
                                </div>
                            </div>
                            <div className={s.statistic}>
                                <div className={s.statistic_row_main}>
                                    <img src={wet} alt="Humidity Icon" />
                                    <p>Влажность</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Нижний угол</p>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ? `${terrarium[0]?.indicators.humidity_cold[0]}${terrarium[0]?.indicators.humidity_cold[1]}` : '-'} %</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Верхний угол</p>
                                    <p>{terrarium.length > 0 && terrarium[0] !== 'null' ? `${terrarium[0]?.indicators.humidity_hot[0]}${terrarium[0]?.indicators.humidity_hot[1]}` : '-'} %</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Диапазон в %</p>
                                    <p>{terrarium.length > 0 ? `${terrarium[1]?.settings.humidity_min}-${terrarium[1]?.settings.humidity_max}` : '-'}%</p>
                                </div>
                            </div>

                            <div className={s.statistic}>
                                <div className={s.statistic_row_main}>
                                    <img src={night} alt="Night Mode Icon" />
                                    <p>Ночной режим</p>
                                </div>
                                <div className={s.statistic_row}>
                                    <p>Время:</p>
                                    <p>{terrarium.length > 0 ? `${terrarium[1]?.settings.light_start_time.split(':')[0]}:${terrarium[1]?.settings.light_start_time.split(':')[1]}` : '-'} - {terrarium.length > 0 ? `${terrarium[1]?.settings.light_stop_time.split(':')[0]}:${terrarium[1]?.settings.light_stop_time.split(':')[1]}` : '-'}</p>
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
