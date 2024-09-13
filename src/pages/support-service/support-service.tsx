import s from './support-service.module.css'
//import mailFieldImage from '../../assets/mailField.svg'
import mailsupport from '../../assets/mailsupport.svg'
import telegramsupport from '../../assets/telegramsupport.svg'
import { Navbar } from '../../shared/navbar/navbar'


function SupportService() {


  return (
  <div className={s.registrationForm}>
      <div className={s.registrationForm_wrapper}>

                <Navbar />

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
