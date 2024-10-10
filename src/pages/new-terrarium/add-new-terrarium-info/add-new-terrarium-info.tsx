import s from './add-new-terrarium-info.module.css'
import { Link } from 'react-router-dom';
import { Navbar } from '../../../shared/navbar/navbar';
import { useState } from 'react';



function AddNewTerrariumInfo() {
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
                              <div className={s.rightQR_side_title}>
                                    <h1>НОВЫЙ ТЕРРАРИУМ</h1>
                              </div>
                              <div className={s.rightQR_side_desciption}>
                                <p>1. Зажмите кнопку на террариуме на 10 секунд <br/>
                                    2. На дисплее террариума появится значек wi-fi<br/>
                                    3. Подключите ваш телефон к wi-fi сети с именем "Umiter terrarium"<br/>
                                    4. В появившейся форме введите данные своей wi-fi сети: название и пароль<br/>
                                    <br/>
                                    ! Если форма из п.4 не появилась, то нужно перейти по <a href='https://192.168.10.1/'>ссылке</a><br/>
                                    <br/>
                                    5. Нажмите кнопку "Далее"<br/>
                                    <br/>

                                    Отсканируйте QR-код с дисплея террариума сканером ниже<br/>
                                    ! Или отсканируйте камерой телефона, перед вами появится код - введите его в поле ниже</p>
                              </div>
                                <div className={s.registrationForm_button_wrapper}>
                                      <Link to={'/new_terrarium'}>
                                          <button onClick={() => {
                                            
                                            }} className={s.registrationForm_button}>Далее</button>
                                      </Link>
                                  </div>
                      </div>
                </div>
        </div>

  </div>
  )
}

export default AddNewTerrariumInfo
