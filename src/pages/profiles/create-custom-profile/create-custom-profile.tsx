import s from './create-custom-profile.module.css'
import layout from '@/shared/styles/layout.module.css'
import { useState } from 'react'
import { temperature } from '@/shared/assets/imageAssets';
import { Navbar } from '@/shared/navbar/navbar';
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';
import { setField } from '@/app/store/reducers/customProfileReducer';
import { useTerrariumProfile } from '@/shared/api/terrarium';

function CustomProfileCreation() {
    const dispatch = useDispatch()
    const [counterDay, setCounterDay] = useState(0)
    const [counterNight, setCounterNight] = useState(0)
    const profile = useSelector((state: RootState) => state.customProfile);
    const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible)

    const { createTerrariumProfile } = useTerrariumProfile()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'startTime') {
            if (value.includes(':') || value === '' || counterDay > 0) {
                dispatch(setField({ field: name, value }));
            } else if (value.length === 2 && counterDay === 0) {
                dispatch(setField({ field: name, value: value + ':' }));
                setCounterDay(1);
            } else {
                dispatch(setField({ field: name, value }));
            }
        } else if (name === 'endTime') {
            if (value.includes(':') || value === '' || counterNight > 0) {
                dispatch(setField({ field: name, value }));
            } else if (value.length === 2 && counterNight === 0) {
                dispatch(setField({ field: name, value: value + ':' }));
                setCounterNight(1);
            } else {
                dispatch(setField({ field: name, value }));
            }
        } else {
            dispatch(setField({ field: name, value }));
        }
    }

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
                        <div className={s.pageTitle}>
                            <input name="name" value={profile.name} onChange={handleChange} className={`${s.registration_form_field__input}`} placeholder='Введите название'></input>
                        </div>
                        <div className={s.statistic_correct_mode}>
                            <div className={s.statistic_correct_mode_left}>
                                <div className={s.title_left}>
                                    <img src={temperature}></img>
                                    <p>Температура воздуха в верхнем углу</p>
                                </div>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input name="temperatureHotDay" value={profile.temperatureHotDay} onChange={handleChange} placeholder='36' maxLength={2} />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Ночь</p>
                                        <input name="temperatureHotNight" value={profile.temperatureHotNight} maxLength={2} onChange={handleChange} placeholder='31' />
                                    </div>
                                </div>
                                <p className={s.input_left_second__title}>Нижний угол</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>День</p>
                                        <input name="temperatureColdDay" value={profile.temperatureColdDay} onChange={handleChange} placeholder='36' maxLength={2} />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Ночь</p>
                                        <input name="temperatureColdNight" value={profile.temperatureColdNight} maxLength={2} onChange={handleChange} placeholder='31' />
                                    </div>
                                </div>

                                <p className={s.input_left_second__title}>Влажность %</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>Минимум</p>
                                        <input name="humidityNight" value={profile.humidityNight} onChange={handleChange} placeholder='31' maxLength={2} />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Максимум</p>
                                        <input name="humidityDay" value={profile.humidityDay} maxLength={2} onChange={handleChange} placeholder='70' />
                                    </div>
                                </div>

                                <p className={s.input_left_second__title}>Ночной режим</p>
                                <div className={s.input_left}>
                                    <div className={s.input_left_item}>
                                        <p>Начало</p>
                                        <input name="startTime" value={profile.startTime} maxLength={5} onChange={handleChange} placeholder='07:00' />
                                    </div>
                                    <div className={s.input_left_item}>
                                        <p>Конец</p>
                                        <input name="endTime" value={profile.endTime} maxLength={5} onChange={handleChange} placeholder='22:00' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.button_wrapper}>
                            <button onClick={() => {
                                if (
                                    profile.name &&
                                    profile.temperatureHotNight &&
                                    profile.temperatureHotDay &&
                                    profile.startTime &&
                                    profile.endTime &&
                                    profile.temperatureColdNight &&
                                    profile.temperatureColdDay &&
                                    profile.humidityDay &&
                                    profile.humidityNight
                                ) {
                                    createTerrariumProfile();
                                }
                            }} className={s.registration_form_button}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomProfileCreation
