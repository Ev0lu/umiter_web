import s from './add-terrarium-qr-info.module.css'
import { Link } from 'react-router-dom';



function AddTerrariumQRInfo() {

  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                              <div className={s.rightQR_side_title}>
                                    <h1>НОВЫЙ ТЕРРАРИУМ</h1>
                              </div>
                              <div className={s.rightQR_side_desciption}>
                                    <p>Зажмите кнопку на террариуме, на 6 секунд. После чего на экране должен появиться qr-код. Его необходимо отсканировать из приложения камеры телефона и ввести данные о Wi-Fi. Если подключение террариума к сети Интернет прошло успешно, на экране террариума появится новый qr-код. Его нужно отсканировать сканером ниже или отсканировать с помощью камеры телефона и ввести код в поле ниже.</p>
                              </div>
                                <div className={s.registrationForm_button_wrapper}>
                                      <Link to={'/add_terrarium'}>
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

export default AddTerrariumQRInfo
