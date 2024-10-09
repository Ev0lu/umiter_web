import s from './support-service.module.css'
//import mailFieldImage from '../../assets/mailField.svg'
import mailsupport from '../../assets/mailsupport.svg'
import telegramsupport from '../../assets/telegramsupport.svg'
import { Navbar } from '../../shared/navbar/navbar'
import { useState } from 'react';



function SupportService() {

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
                        <h1>Служба поддержки</h1>
                    </div>
                    <div className={s.service_items}>
                        <p className={s.service_items_header}>Связаться с нами</p>
                        <div className={s.service_wrapper}>
                            <div className={s.service_item}>
                                <img src={telegramsupport}></img>
                                <p>umiterservis</p>
                            </div>
                            <div className={s.service_item}>
                                <img src={mailsupport}></img>
                                <p>servis@umiter.ru</p>
                            </div>
                        </div>


                    </div>

                    
                </div>  
        </div>
  </div>
  )
}

export default SupportService
