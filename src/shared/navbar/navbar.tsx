import s from './navbar.module.css'
import miniLogo from '../../assets/MiniLogo.svg'

import terrarium from '../../assets/terrariumSideBar.svg'
import settings from '../../assets/settings.svg'
import graphic from '../../assets/graphicc.svg'
import { useLocation, useNavigate } from 'react-router-dom'

import heartsvg from '../../assets/heart.svg'
import logout from '../../assets/logOut.svg'
import { useEffect, useRef, useState } from 'react'
import { setToken } from '../../App'


export const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
  
    const refContainer = useRef(null);
    const [isInscriptionHidden, setIsInscriptionHidden] = useState(false);

    const handleResize = () => {
        if (refContainer.current) {
            const width = refContainer.current.offsetWidth;
            setIsInscriptionHidden(width < 240);
        }
    };
    useEffect(() => {
        handleResize()
    }, [setTimeout(() => 'a', 1000)])
    
    return (
        <div ref={refContainer} className={s.navbar_side}>
            <div className={s.navbar_side_wrapper}>
                <div className={s.logotype}>
                    <img src={miniLogo} alt="Mini Logo" />
                </div>
                <div className={s.mainNav}>
                    <div onClick={() => {navigate('/terrarium_list')}} style={{width: isInscriptionHidden ? '65px' : '100%' }} className={`${s.navMenuLink} ${isActive('/') ? s.active : ''} ${isActive('/terrarium_list') ? s.active : ''}`}>
                        <img src={terrarium} alt="Terrariums" />
                        <p style={{ display: isInscriptionHidden ? 'none' : 'block' }}>Террариумы</p>
                    </div>
                    <div style={{width: isInscriptionHidden ? '65px' : '100%' }} className={`${s.navMenuLink}  ${isActive('/stats') ? s.active : ''}`}>
                        <img src={settings} alt="Settings" />
                        <p style={{ display: isInscriptionHidden ? 'none' : 'block' }}>Настройки</p>
                    </div>
                    <div onClick={() => {navigate('/new_terrarium')}} style={{width: isInscriptionHidden ? '65px' : '100%' }} className={`${s.navMenuLink}  ${isActive('/new_terrarium') ? s.active : ''}`}>
                            <img src={graphic} alt="Graphics" />
                            <p style={{ display: isInscriptionHidden ? 'none' : 'block'}}>Добавить терр.</p>  
                    </div>
                    
                </div>
                <div className={s.bottomNav}>
                    <div style={{width: isInscriptionHidden ? '65px' : '100%' }} className={`${s.navMenuLink}  ${isActive('/stats') ? s.active : ''}`}>
                        <img src={heartsvg} alt="Support" />
                        <p style={{ display: isInscriptionHidden ? 'none' : 'block' }}>Служба поддержки</p>
                    </div>
                    <div onClick={() => {
                            setToken('access', '')
                            navigate('/login')
                    }
                    } style={{width: isInscriptionHidden ? '65px' : '100%' }} className={`${s.navMenuLink}  ${isActive('/stats') ? s.active : ''}`}>
                        <img src={logout} alt="Logout" />
                        <p style={{ display: isInscriptionHidden ? 'none' : 'block' }}>Выход</p>
                    </div>
                </div>
            </div>
        </div>
    );
};