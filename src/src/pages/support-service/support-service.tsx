import s from './support-service.module.css'
import layout from '@/shared/styles/layout.module.css'
import { mailsupport, telegramsupport } from '@/shared/assets/imageAssets';
import { Navbar } from '@/shared/navbar/navbar'
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/index';

function SupportService() {
  const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible)

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
            <h1>Служба поддержки</h1>
          </div>
          <div className={s.service_items}>
            <p className={s.service_items_header}>Связаться с нами</p>
            <div className={s.service_wrapper}>
              <div className={s.service_item}>
                <a href="https://t.me/Umiter_SERVICE_bot" target="_blank" rel="noopener noreferrer">
                  <img src={telegramsupport} alt="Telegram Bot" />
                  <p>Umiter_SERVICE_bot</p>
                </a>
              </div>
              <div className={s.service_item}>
                <a href="mailto:service@umiter.ru">
                  <img src={mailsupport} alt="Email" />
                  <p>service@umiter.ru</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportService
