import s from './registration.module.css'
import umiterLogo from '@/shared/assets/images/LOGO_varelmo.svg'
import { passwordFieldEye, passwordFieldLock, nameFieldImage, phoneFieldImage } from '@/shared/assets/imageAssets'
import { Link } from 'react-router-dom';
import { useRegistrationModel } from './model';

function Registration() {
  const {
    name,
    password,
    phone,
    showPassword,
    checkIsValidPhone,
    errorFields,
    handleChangeName,
    handlePhoneChange,
    handleTogglePassword,
    setPassword,
    handleRegister,
  } = useRegistrationModel();

  return (
    <div className={s.registration_form}>
      <div className={s.registration_form_wrapper}>
        <div className={s.registrationLogo}>
          <img className={s.logotype} src={umiterLogo} alt="logo" />
        </div>
        <div className={s.registration_form_fields}>
          <div className={s.registration_form_header}>
            <h1>РЕГИСТРАЦИЯ</h1>
          </div>
          <div className={s.registration_form_field}>
            <img className={s.registration_form_field_image} src={nameFieldImage} alt="name" />
            <input
              value={name}
              onChange={handleChangeName}
              className={`${s.registration_form_field__input} ${errorFields.name && s.error}`}
              placeholder='имя'
            />
            {name === '' && errorFields.name && <span className={s.error_message}>Пожалуйста, введите логин</span>}
          </div>
          <div className={s.registration_form_field}>
            <img className={s.registration_form_field_image} src={phoneFieldImage} alt="phone" />
            <input
              value={phone}
              onChange={handlePhoneChange}
              className={`${s.registration_form_field__input} ${errorFields.phone && s.error}`}
              placeholder='номер телефона'
            />
            {phone === '' && errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>}
            {phone !== '' && checkIsValidPhone === '' && <span className={s.error_message}>Телефон должен начинаться с +...</span>}
          </div>
          <div className={s.registration_form_field__password}>
            <img className={s.registration_form_field_image} src={passwordFieldLock} alt="lock" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              className={`${s.registration_form_field__input__password} ${errorFields.password && s.error}`}
              placeholder='пароль'
            />
            <img
              onClick={handleTogglePassword}
              className={s.registration_form_field_imageEye}
              src={passwordFieldEye}
              alt="show/hide"
            />
            <div className={s.password_form__bottom}>
              {password === '' && errorFields.password && <span className={s.error_message}>Пожалуйста, введите пароль</span>}
              <p className={s.passwordCharsCount}>{`${password.length}`}/10</p>
            </div>
          </div>
          <div className={s.registration_form_button_wrapper}>
            <Link
              to={
                name && phone && password && password.length > 9 && checkIsValidPhone === 'true'
                  ? '/code_verification'
                  : '/registration'
              }
            >
              <button
                onClick={handleRegister}
                className={s.registration_form_button}
              >
                Зарегистрироваться
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
