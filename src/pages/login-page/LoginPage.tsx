import s from './LoginPage.module.css'
import umiterLogo from '../../assets/LOGO_varelmo.svg'
import passwordFieldEye from '../../assets/passwordFieldEye.svg'
import passwordFieldLock from '../../assets/passwordFieldLock.svg'
import phoneFieldImage from '../../assets/phoneField.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { setToken } from '../../App'

function LoginPage() {
    const navigate = useNavigate()
    const [phone, setPhone] = useState<string>('+7');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [responsePassword, setResponsePassword] = useState<boolean>(false);

    useEffect(() => {
        if (password == '') {
            setShowPassword(true)
        } else {
            setTimeout(() => setShowPassword(false), 200)
        }        

    }, [password])

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const [errorFields, setErrorFields] = useState({
        phone: false,
        password: false,
    });

    const validateFields = () => {
        const errors = {
            phone: phone === '',
            password: password === '',
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };

    const loginUser = async () => {  
        let user = {
            phoneNumber: phone, 
            password: password, 
            clientId: "web-app"
        };
      
        try {
          const response = await fetch('https://api.umiter.ru/v1/public/user/auth/password/token', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
      
          if (response.ok) {
            const data = await response.json();
            setToken('access', data.accessToken)
            setToken('refresh', data.refreshToken)


            return navigate("/terrarium_list")

          } else {
            //return navigate("/login")
            setPassword('')
            setPhone('+7')
            setResponsePassword(true)
            
          }
      
        } catch (error) {
      
        }
      }
    

  return (
  <div className={s.registrationForm}>
      <div className={s.registrationForm_wrapper}>

            <div className={s.registrationLogo}>
                    <img className={s.logotype} src={umiterLogo}></img>
                </div>

                <div className={s.registrationForm_fields}>
                    <div className={s.registrationForm_header}>
                        <h1>ЛОГИН</h1>
                    </div>

                    <div className={s.registrationForm_field}>
                        <img className={s.registrationForm_field_image} src={phoneFieldImage}></img>
                        <input value={phone}
                        onChange={(e) => setPhone(e.target.value)} className={`${s.registrationForm_field__input} ${errorFields.phone && s.error}`} placeholder='номер телефона'></input>
                        {phone === '' && (errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
                    </div>

                    <div className={s.registrationForm_field__password}>
                        <img className={s.registrationForm_field_image} src={passwordFieldLock}></img>
                        <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        className={`${s.registrationForm_field__input__password} ${errorFields.password && s.error}`} placeholder='пароль'></input>
                        <img onClick={handleTogglePassword} className={s.registrationForm_field_imageEye} src={passwordFieldEye}></img>

                        <div className={s.password_form__bottom}>
                                { password === '' && (errorFields.password && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}
                                { password === '' && (responsePassword && <span className={s.error_message}>Введине правильные данные</span>)}
                                <p className={s.passwordCharsCount}>{`${password.length}`}/10</p>
                        </div>

                    </div>    
                    {/*<div className={s.radio_gender}>
                        <input type="radio" id="agreement" name="agreement" value='true' checked={agreement === 'true'} onChange={(e) => setAgreement(e.target.value)} />
                        <span className={s.registrationForm_field__hasAccountText__agreement}>Я принимаю</span> 
                        <Link to='/login'>
                            <span className={s.registrationForm_field__hasAccountLink__agreement}>Правила и Соглашения</span>
                        </Link>                    </div>*/}
                    <div className={s.registrationForm_button_wrapper}>
                            <button onClick={() => {
                                validateFields()
                               loginUser()
                                
                                }} className={s.registrationForm_button}>Войти</button>
                    </div>
                    <div className={s.registrationForm_field__hasAccount}>
                        <span className={s.registrationForm_field__hasAccountText}>Еще нет аккаунта?</span> 
                        <Link to='/add_terrarium/info'>
                            <span className={s.registrationForm_field__hasAccountLink}>Регистрация</span>
                        </Link>
                    </div>     
                    {/*<div className={s.registrationForm_field__hasAccount}>
                        <span className={s.registrationForm_field__hasAccountText}>Забыли пароль?</span> 
                        <Link to='/login'>
                            <span className={s.registrationForm_field__hasAccountLink}>Восстановите пароль</span>
                        </Link>
                    </div>*/}       
                </div>

     
    </div>

  </div>
  )
}

export default LoginPage