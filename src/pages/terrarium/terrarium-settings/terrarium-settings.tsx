import s from './terrarium-settings.module.css';
import layout from '@/shared/styles/layout.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/shared/navbar/navbar';
import { terrariumApi } from '@/shared/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';

function TerrariumSettings() {
    const navigate = useNavigate();
    const location = useLocation();
    const terrariumId = location.pathname.split('/')[2];
    const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);   
    const [deleteTerrarium] = terrariumApi.useDeleteTerrariumMutation();

    return (
        <div className={s.registration_form}>
            <div className={s.registration_form_wrapper}>
                <BurgerMenu />
                <div className={`${layout.leftMenu_side} ${menuOpen ? layout.menuOpen : ''}`}>
                    <div className={layout.leftMenu_side_wrapper}>
                        <Navbar />
                    </div>
                </div>
                <div className={s.registration_form_fields}>
                    <div className={s.registration_form_header}>
                        <h1>НАСТРОЙКИ ТЕРРАРИУМА</h1>
                    </div>
                    <div className={s.registration_form_field}>
                        <div onClick={() => navigate('terrarium_info')} className={s.registration_form_field__input} style={{ cursor: 'pointer' }}>
                            <p className={s.settingsItem}>Сменить часовой пояс и имя</p>
                        </div>
                    </div>
                    <div className={s.registration_form_field}>
                        <div onClick={() => {
                            localStorage.setItem('terrariumToChange', terrariumId);
                            navigate('/select_profile');
                        }} className={s.registration_form_field__input} style={{ cursor: 'pointer' }}>
                            <p className={s.settingsItem}>Сменить вид</p>
                        </div>
                    </div>
                    <div className={s.registration_form_field}>
                        <div onClick={async () => {
                            await deleteTerrarium(terrariumId).unwrap();
                            navigate('/terrarium_list');
                        }} className={s.registration_form_field__input} style={{ cursor: 'pointer' }}>
                            <p className={s.settingsItem} style={{ color: '#990b0b' }}>Отвязать террариум</p>
                        </div>
                    </div>
                    <div className={s.registration_form_button_wrapper}>
                        <Link to={`/terrarium/${terrariumId}`}>
                            <button className={s.registration_form_button}>Вернуться</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TerrariumSettings;
