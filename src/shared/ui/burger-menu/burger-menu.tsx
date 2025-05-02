import s from './burger-menu.module.css'
import layout from '../../../shared/styles/layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store/index';
import { close, open } from '../../../app/store/reducers/visibleMenuReducer';

export const BurgerMenu = () => {
    const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);
    const dispatch = useDispatch<AppDispatch>();
    const toggleMenu = () => {
      if (menuOpen == false) {
        dispatch(open())
      } else {
        dispatch(close())
      }
    };
    
    return (
        <div>
            <div className={s.burgerMenuIcon} onClick={toggleMenu}>
                <div className={s.burgerLine}></div>
                <div className={s.burgerLine}></div>
                <div className={s.burgerLine}></div>
            </div>
            {menuOpen && <div className={layout.menuOverlay} onClick={toggleMenu}></div>}
        </div>
    )
}