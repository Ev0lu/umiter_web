import s from './add-terrarium-qr.module.css'
import qrStyle from '@/shared/styles/qr-scan.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useValidation, useLinkIdChecker, useQrScanner } from '@/shared/api';

function AddTerrariumQR() {
  const [linkId, setLinkId] = useState('');
  const { errorFields, validateFields } = useValidation(['linkId']);
  const fieldValues = { linkId };

  const onQrCodeSuccess = (decodedText: string) => {
    setLinkId(decodedText);
    setEnabled(false);
  };

  const { isEnabled, setEnabled } = useQrScanner(onQrCodeSuccess);
  const isLinkIdExist = useLinkIdChecker(linkId);

  return (
    <div className={s.new_terrarium_form}>
      <div className={s.new_terrarium_form_wrapper}>
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
                onChange={(e) => { setLinkId(e.target.value) }}
                className={`${s.registration_form_field__input__password} ${errorFields.linkId && s.error}`} placeholder='Введите айди'></input>
              <div className={s.password_form__bottom}>
                {linkId === '' && (errorFields.linkId && <span className={s.error_message}>Пожалуйста, введите корректный код</span>)}
                <p className={s.passwordCharsCount}>{linkId.length}/20</p>
              </div>
            </div>
            <div className={s.registration_form_button_wrapper}>
              <Link to={isLinkIdExist.isLinkIdExist ? '/registration' : '/add_terrarium'}>
                <button onClick={() => {
                  validateFields(fieldValues)
                  if (isLinkIdExist.isLinkIdExist) sessionStorage.setItem('linkId', linkId)
                }} className={s.registration_form_button}>Далее</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTerrariumQR
