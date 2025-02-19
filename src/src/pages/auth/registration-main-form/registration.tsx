import s from './registration.module.css'
import umiterLogo from '@/shared/assets/images/LOGO_varelmo.svg'
import { passwordFieldEye, passwordFieldLock, nameFieldImage, phoneFieldImage } from '@/shared/assets/imageAssets'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useValidation } from '@/shared/api/index';

function Registration() {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (password == '') {
            setShowPassword(true)
        } else {
            setTimeout(() => setShowPassword(false), 200)
        }
    }, [password])

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = event.target.value.replace(/[<>%$&!*^`/"',.|#@()\[\]{}0-9]/g, '');
        setName(sanitizedValue);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isValidPhone = /^\+/.test(event.target.value)
        if (isValidPhone === true) {
            setCheckIsValidPhone('true')
        } else {
            setCheckIsValidPhone('')
        }
        setPhone(event.target.value);
    };

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const [checkIsValidPhone, setCheckIsValidPhone] = useState('')
    const [checkUniqueLoginPhone,] = useState('')

    const { errorFields, validateFields } = useValidation(['name', 'phone', 'password', 'checkIsValidPhone', 'checkUniqueLoginPhone']);

    const fieldValues = { name, phone, password, checkIsValidPhone, checkUniqueLoginPhone };

    return (
        <div className={s.registration_form}>
            <div className={s.registration_form_wrapper}>
                <div className={s.registrationLogo}>
                    <img className={s.logotype} src={umiterLogo}></img>
                </div>
                <div className={s.registration_form_fields}>
                    <div className={s.registration_form_header}>
                        <h1>РЕГИСТРАЦИЯ</h1>
                    </div>
                    <div className={s.registration_form_field}>
                        <img className={`${s.registration_form_field_image}`} src={nameFieldImage}></img>
                        <input value={name}
                            onChange={handleChangeName} className={`${s.registration_form_field__input} ${errorFields.name && s.error}`} placeholder='имя'></input>
                        {name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите логин</span>)}
                    </div>
                    <div className={s.registration_form_field}>
                        <img className={s.registration_form_field_image} src={phoneFieldImage}></img>
                        <input value={phone}
                            onChange={handlePhoneChange} className={`${s.registration_form_field__input} ${errorFields.phone && s.error}`} placeholder='номер телефона'></input>
                        {phone === '' && (errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
                        {phone !== '' && checkIsValidPhone === '' && <span className={s.error_message}>Телефон должен начинаться с +...</span>}
                    </div>
                    <div className={s.registration_form_field__password}>
                        <img className={s.registration_form_field_image} src={passwordFieldLock}></img>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            className={`${s.registration_form_field__input__password} ${errorFields.password && s.error}`} placeholder='пароль'></input>
                        <img onClick={handleTogglePassword} className={s.registration_form_field_imageEye} src={passwordFieldEye}></img>

                        <div className={s.password_form__bottom}>
                            {password === '' && (errorFields.password && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}
                            <p className={s.passwordCharsCount}>{`${password.length}`}/10</p>
                        </div>
                    </div>
                    <div className={s.registration_form_button_wrapper}>
                        <Link to={(name && phone && password && password.length > 9 && checkIsValidPhone === 'true') ? '/code_verification' : '/registration'}>
                            <button onClick={() => {
                                validateFields(fieldValues)
                                if (name && phone && password && password.length > 9 && checkIsValidPhone === 'true') {
                                    sessionStorage.setItem('name', name)
                                    sessionStorage.setItem('phone', phone)
                                    sessionStorage.setItem('password', password)
                                }
                            }} className={s.registration_form_button}>Зарегистрироваться</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
