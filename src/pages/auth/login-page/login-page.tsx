import s from './login-page.module.css'
import { passwordFieldEye, passwordFieldLock, phoneFieldImage, umiterLogo } from '@/shared/assets/imageAssets'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { setToken } from '@/features/auth/tokens'
import { useLoginUser, useValidation } from '@/shared/api/index';

function LoginPage() {
    const [phone, setPhone] = useState<string>('+7');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [responsePassword, setResponsePassword] = useState<boolean>(false);
    const { handleLogin: loginUser } = useLoginUser();

    useEffect(() => {
        (password == '') ? setShowPassword(true) : setTimeout(() => setShowPassword(false), 200)
    }, [password])

    const { errorFields, validateFields } = useValidation(['phone', 'password']);

    const fieldValues = { phone, password };

    return (
        <div className={s.registration_form}>
            <div className={s.registration_form_wrapper}>
                <div className={s.registrationLogo}>
                    <img className={s.logotype} src={umiterLogo}></img>
                </div>
                <div className={s.registration_form_fields}>
                    <div className={s.registration_form_header}>
                        <h1>ЛОГИН</h1>
                    </div>
                    <div className={s.registration_form_field}>
                        <img className={s.registration_form_field_image} src={phoneFieldImage}></img>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`${s.registration_form_field__input} ${errorFields.phone && s.error}`} placeholder='номер телефона'></input>
                        {phone === '' && (errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
                    </div>
                    <div className={s.registration_form_field__password}>
                        <img className={s.registration_form_field_image} src={passwordFieldLock}></img>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            className={`${s.registration_form_field__input__password} ${errorFields.password && s.error}`} placeholder='пароль'></input>
                        <img onClick={() => setShowPassword(!showPassword)} className={s.registration_form_field_imageEye} src={passwordFieldEye}></img>
                        <div className={s.password_form__bottom}>
                            <div className={s.errors_wrapper}>
                                {password === '' && (errorFields.password && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}
                                {password === '' && (responsePassword && <span className={s.error_message}>Введите правильные данные</span>)}
                            </div>
                            <p className={s.passwordCharsCount}>{`${password.length}`}/10</p>
                        </div>
                    </div>
                    <div className={s.registration_form_button_wrapper}>
                        <button onClick={async () => {
                            validateFields(fieldValues)
                            await loginUser({
                                phoneNumber: phone,
                                password: password,
                                onSuccess: (data) => {
                                    setToken('access', data.accessToken);
                                    setToken('refresh', data.refreshToken);
                                },
                                onFailure: () => {
                                    setPassword('');
                                    setPhone('+7');
                                    setResponsePassword(true);
                                },
                            });
                        }} className={s.registration_form_button}>Войти</button>
                    </div>
                    <div className={s.registration_form_field__hasAccount}>
                        <span className={s.registration_form_field__hasAccountText}>Еще нет аккаунта?</span>
                        <Link to='/add_terrarium/info'>
                            <span className={s.registration_form_field__hasAccountLink}>Регистрация</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage