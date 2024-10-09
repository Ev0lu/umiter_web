import s from './add-new-terrarium-by-qr.module.css'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'


import { Html5Qrcode } from "html5-qrcode";
import { Navbar } from '../../../shared/navbar/navbar';
import { checkLinkId, createTerrarium } from '../../../shared/api';
import { getToken } from '../../../App';



function AddNewTerrariumToProfile() {
  const [linkId, setLinkId] = useState('');
  const [isLinkIdExist, setIsLinkIdExist] = useState(false)

  const [errorFields, setErrorFields] = useState({
    linkId: false,
});

const validateFields = () => {
    const errors = {
      linkId: linkId === '',
        
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
};

const [isEnabled, setEnabled] = useState(false);

useEffect(() => {
  const config = { fps: 10, qrbox: { width: 150, height: 150 } };

  const html5QrCode = new Html5Qrcode("qrCodeContainer");

  const qrScanerStop = () => {
    if (html5QrCode && html5QrCode.isScanning) {
      html5QrCode
        .stop()
        .then(() => console.log("Scaner stop"))
        .catch(() => console.log("Scaner error"));
    }
  };
  const qrCodeErrorCallback = () => {
   // console.error(`QR Code Error: ${errorMessage}`);
  };

  const qrCodeSuccess = (decodedText:any) => {
    setLinkId(decodedText);
    setEnabled(false);
    checkLinkIdExistence()
  };

  if (isEnabled) {
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess, qrCodeErrorCallback);
    setLinkId("");
  } else {
    qrScanerStop();
  }

  return () => {
    qrScanerStop();
  };
}, [isEnabled]);

const checkLinkIdExistence = async () => {

  const response:any = await checkLinkId(linkId)
  if (response.ok) {
    console.log('ok')
    setIsLinkIdExist(true)
  } else if (response.status === 404) {
    console.log('didntexist')
    setIsLinkIdExist(false)
  }
}

useEffect(() => {
  if (linkId.length === 20) {
    checkLinkIdExistence()
  }  
}, [linkId])

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
                              <div id="qrCodeContainer"  className={s.rightQR_side_photoIcon}>
                              </div>
                              <button className={s.registrationForm_button_camera} style={{display: isEnabled ? 'none': ""}} onClick={() => setEnabled(!isEnabled)}>
                                {isEnabled ? "Off" : "Включить камеру"}
                              </button>
                              <p className={s.underPhotoText}>Или вставьте код в поле ниже</p>
                              <div className={s.registrationForm_field__password}>
                                  <input
                                  value={linkId}
                                  onChange={(e) => {
                                    setLinkId(e.target.value)

                                  }}
                                  className={`${s.registrationForm_field__input__password} ${errorFields.linkId && s.error}`} placeholder='Введите айди'></input>

                                  <div className={s.password_form__bottom}>
                                      { linkId === '' && (errorFields.linkId && <span className={s.error_message}>Пожалуйста, введите корректный код</span>)}
                                      <p className={s.passwordCharsCount}>{linkId.length}/20</p>
                                  </div>

                                  </div>    
                                  <div className={s.registrationForm_button_wrapper}>
                                      <Link to={isLinkIdExist ? '/select_profile' : '/new_terrarium'}>
                                          <button onClick={() => {
                                            validateFields()
                                            if (isLinkIdExist === true) {
                                                const token = getToken('access')
                                                createTerrarium(token, linkId)
                                            }
                                            }} className={s.registrationForm_button}>Далее</button>
                                      </Link>
                                  </div>
                      </div>
                </div>
        </div>

  </div>
  )
}

export default AddNewTerrariumToProfile
