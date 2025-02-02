import s from './add-new-terrarium-by-qr.module.css'
import qrStyle from '@/shared/styles/qr-scan.module.css'
import layout from '@/shared/styles/layout.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Navbar } from '@/shared/navbar/navbar';
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useValidation, terrariumApi, useLinkIdChecker, useQrScanner } from '@/shared/api';

function AddNewTerrariumToProfile() {
  const [linkId, setLinkId] = useState('');
  const { errorFields, validateFields } = useValidation(['linkId']);
  const [createTerrarium, {}] = terrariumApi.useCreateTerrariumMutation()
  const fieldValues = { linkId };

  const onQrCodeSuccess = (decodedText: string) => {
    setLinkId(decodedText);
    setEnabled(false);
  };

  const { isEnabled, setEnabled } = useQrScanner(onQrCodeSuccess);
  const isLinkIdExist = useLinkIdChecker(linkId);
  const menuOpen = useSelector((store: RootState) => store.visibleMenu.isVisible)

  return (
    <div className={s.new_terrarium_form}>
      <div className={s.new_terrarium_form_wrapper}>
        <BurgerMenu />
        <div className={`${layout.leftMenu_side} ${menuOpen ? layout.menuOpen : ''}`}>
          <div className={layout.leftMenu_side_wrapper}>
            <Navbar />
          </div>
        </div>
        <div className={s.right_side}>
          <div className={s.right_side_wrapper}>
            <div className={s.right_side_title}>
              <h1>НОВЫЙ ТЕРРАРИУМ</h1>
            </div>
            <div id="qrCodeContainer" className={qrStyle.rightQR_side_photoIcon}>
            </div>
            <button className={qrStyle.registration_form_button_camera} style={{ display: isEnabled ? 'none' : "" }} onClick={() => setEnabled(!isEnabled)}>
              {isEnabled ? "Off" : "Включить камеру"}
            </button>
            <p className={s.underPhotoText}>Или вставьте код в поле ниже</p>
            <div className={s.registration_form_field__password}>
              <input
                value={linkId}
                onChange={(e) => setLinkId(e.target.value)}
                className={`${s.registration_form_field__input__password} ${errorFields.linkId && s.error}`} placeholder='Введите айди'></input>
              <div className={s.password_form__bottom}>
                {linkId === '' && (errorFields.linkId && <span className={s.error_message}>Пожалуйста, введите корректный код</span>)}
                <p className={s.passwordCharsCount}>{linkId.length}/20</p>
              </div>
            </div>
            <div className={s.registration_form_button_wrapper}>
              <Link to={isLinkIdExist ? '/select_profile' : '/new_terrarium'}>
                <button onClick={async () => {
                  validateFields(fieldValues)
                  if (isLinkIdExist) await createTerrarium(linkId);
                }} className={s.registration_form_button}>Далее</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddNewTerrariumToProfile
