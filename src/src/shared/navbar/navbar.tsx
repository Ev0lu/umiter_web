import s from './navbar.module.css'
import { miniLogo, terrarium, settings, terr, heartsvg, logout } from '@/shared/assets/imageAssets'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { setToken } from '@/features/auth/tokens'
import { AppDispatch } from '@/app/store'
import { useDispatch } from 'react-redux'
import { close } from '@/app/store/reducers/visibleMenuReducer';

export const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const isActive = (path: string) => location.pathname === path;
    const refContainer = useRef(null);
    const [, setIsInscriptionHidden] = useState(false);

    const handleResize = () => {
        if (refContainer.current) {
            const width = refContainer.current.offsetWidth;
            setIsInscriptionHidden(width < 240);
        }
    };

    useEffect(() => {
        handleResize()
    }, [setTimeout(() => 'test', 1000)])

    return (
        <div ref={refContainer} className={s.navbar_side}>
            <div className={s.navbar_side_wrapper}>
                <div className={s.logotype}>
                    <img src={miniLogo} alt="Mini Logo" />
                </div>
                <div className={s.mainNav}>
                    <div onClick={() => { navigate('/terrarium_list'); dispatch(close()) }} className={`${s.navMenuLink} ${isActive('/') ? s.active : ''} ${isActive('/terrarium_list') ? s.active : ''}`}>
                        <img src={terr} alt="Terrariums" />
                        <p>Террариумы</p>
                    </div>
                    <div onClick={() => { navigate('/new_terrarium/info'); dispatch(close()) }} className={`${s.navMenuLink}  ${isActive('/new_terrarium/info') ? s.active : ''}`}>
                        <img src={terrarium} alt="Graphics" />
                        <p>Добавить терр.</p>
                    </div>
                    <div onClick={() => { navigate('/settings'); dispatch(close()) }} className={`${s.navMenuLink}  ${isActive('/settings') ? s.active : ''}`}>
                        <img src={settings} alt="Settings" />
                        <p>Настройки</p>
                    </div>
                </div>
                <div className={s.bottomNav}>
                    <div onClick={() => { navigate('/support'); dispatch(close()) }} className={`${s.navMenuLink}  ${isActive('/support') ? s.active : ''}`}>
                        <img src={heartsvg} alt="Support" />
                        <p>Служба поддержки</p>
                    </div>
                    <div onClick={() => {
                        setToken('access', '')
                        setToken('refresh', '')
                        navigate('/login')
                        dispatch(close())
                    }
                    } className={`${s.navMenuLink}  ${isActive('/stats') ? s.active : ''}`}>
                        <img src={logout} alt="Logout" />
                        <p >Выход</p>
                    </div>
                </div>
            </div>
        </div>
    );
};