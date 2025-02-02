import s from './add-terrarium-qr-info.module.css'
import { Link } from 'react-router-dom';

function AddTerrariumQRInfo() {
      
      return (
            <div className={s.new_terrarium_form}>
                  <div className={s.new_terrarium_form_wrapper}>
                        <div className={s.right_side}>
                              <div className={s.right_side_wrapper}>
                                    <div className={s.right_side_title}>
                                          <h1>НОВЫЙ ТЕРРАРИУМ</h1>
                                    </div>
                                    <div className={s.right_side_desciption}>
                                          <p>1. Зажмите кнопку на террариуме на 10 секунд <br />
                                                2. На дисплее террариума появится значек wi-fi<br />
                                                3. Подключите ваш телефон к wi-fi сети с именем "Umiter terrarium"<br />
                                                4. В появившейся форме введите данные своей wi-fi сети: название и пароль<br />
                                                <br />
                                                ! Если форма из п.4 не появилась, то нужно перейти по <a href='https://192.168.10.1/'>ссылке</a><br />
                                                <br />
                                                5. Нажмите кнопку "Далее"<br />
                                                <br />

                                                Отсканируйте QR-код с дисплея террариума сканером ниже<br />
                                                ! Или отсканируйте камерой телефона, перед вами появится код - введите его в поле ниже</p>                           </div>
                                    <div className={s.registration_form_button_wrapper}>
                                          <Link to={'/add_terrarium'}>
                                                <button className={s.registration_form_button}>Далее</button>
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>

            </div>
      )
}

export default AddTerrariumQRInfo
