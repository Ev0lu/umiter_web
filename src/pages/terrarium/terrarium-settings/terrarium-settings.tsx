import s from './terrarium-settings.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../shared/navbar/navbar'
import { deleteTerrarium } from '../../../shared/api';
import { getToken } from '../../../App';
import { useState } from 'react';


function TerrariumSettings() {
    const navigate = useNavigate()
    const location = useLocation()
    const changeProfile = async () => {
        const token = getToken('access');
        if (!token) {
            navigate('/login')
        };
        localStorage.setItem('terrariumToChange', location.pathname.split('/')[2])
    }

    const deleteTerrariumById = async () => {
        const token = getToken('access');
        if (!token) {
            navigate('/login')
        };
        await deleteTerrarium(location.pathname.split('/')[2], token)
    }

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    };
  return (
  <div className={s.registrationForm}>
      <div className={s.registrationForm_wrapper}>

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

                <div className={s.registrationForm_fields}>
                    <div className={s.registrationForm_header}>
                        <h1>НАСТРОЙКИ ТЕРРАРИУМА</h1>
                    </div>
                    <div className={s.registrationForm_field}>
                        <div 
                        onClick={() => navigate('terrarium_info')} style={{cursor: 'pointer'}} className={`${s.registrationForm_field__input}`}>
                            <p className={s.settingsItem}>Сменить часовой пояс и имя</p>

                        </div> 
                    </div>
                    <div className={s.registrationForm_field}>
                        <div onClick={async () => {
                            await changeProfile()
                            navigate('/select_profile')
                            }} style={{cursor: 'pointer'}} className={`${s.registrationForm_field__input}`}>
                                <p className={s.settingsItem}>Сменить профиль</p>
                        </div> 
                    </div>
                    <div className={s.registrationForm_field}>
                    <div onClick={async () => {
                        await deleteTerrariumById()
                        navigate('/terrarium_list')}} style={{cursor: 'pointer'}} className={`${s.registrationForm_field__input}`}>
                                <p style={{color: '#990b0b'}} className={s.settingsItem}>Отвязать террариум</p>
                    </div>                     
                    </div> 
  
                    <div className={s.registrationForm_button_wrapper}>
                        <Link to={`/terrarium/${location.pathname.split('/')[2]}`}>
                            <button onClick={() => {
                                }} className={s.registrationForm_button}>Вернуться</button>
                        </Link>
                    </div>       
                </div> 
        </div>
  </div>
  )
}

export default TerrariumSettings
