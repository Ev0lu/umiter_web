import s from './Registration.module.css'
import umiterLogo from '../../assets/LOGO_varelmo.svg'
import passwordFieldEye from '../../assets/passwordFieldEye.svg'
import mailFieldImage from '../../assets/mailField.svg'
import passwordFieldLock from '../../assets/passwordFieldLock.svg'
import nameFieldImage from '../../assets/nameField.svg'
import phoneFieldImage from '../../assets/phoneField.svg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'


function Registration() {
    /*const dispatch = useDispatch()
    const nameState = useSelector(state => state.profile)
    console.log(nameState)
*/
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (password == '') {
            setShowPassword(true)
        } else {
            setTimeout(() => setShowPassword(false), 200)
        }        
    }, [password])

    const handleChangeName = (event:any) => {
        const sanitizedValue = event.target.value.replace(/[<>%$&!*^`/"',.|#@()\[\]{}0-9]/g, '');
        setName(sanitizedValue);
      };

    const handlePhoneChange = (event:any) => {
        const isValidPhone = /^\+/.test(event.target.value)
        if (isValidPhone === true) {
            setCheckIsValidPhone('true')
        } else{
            setCheckIsValidPhone('')
        }
        setPhone(event.target.value);
    };

    const handleMailChange = (event:any) => {
        setMail(event.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(event.target.value);
        if (isValidEmail === true) {
            setCheckValidMail('true')
        } else{
            setCheckValidMail('')
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const [errorFields, setErrorFields] = useState({
        name: false,
        phone: false,
        mail: false,
        password: false,
        checkValidMail: false,
        checkIsValidPhone: false,
        checkUniqueLoginPhone: false
    });

    const [checkIsValidPhone,setCheckIsValidPhone] = useState('')
    const [checkUniqueLoginPhone, ] = useState('')
    const [checkValidMail,setCheckValidMail] = useState('')

    const validateFields = () => {
        const errors = {
            name: name === '',
            phone: phone === '',
            mail: mail === '',
            password: password === '',
            checkValidMail: checkValidMail === '',
            checkIsValidPhone: checkIsValidPhone === '',
            checkUniqueLoginPhone: checkUniqueLoginPhone === ''
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };

  return (
  <div className={s.registrationForm}>
      <div className={s.registrationForm_wrapper}>

            <div className={s.registrationLogo}>
                    <img className={s.logotype} src={umiterLogo}></img>
                </div>

                <div className={s.registrationForm_fields}>
                    <div className={s.registrationForm_header}>
                        <h1>РЕГИСТРАЦИЯ</h1>
                    </div>
                    <div className={s.registrationForm_field}>
                        <img className={`${s.registrationForm_field_image}`} src={nameFieldImage}></img>
                        <input value={name}
                        onChange={handleChangeName} className={`${s.registrationForm_field__input} ${errorFields.name && s.error}`} placeholder='имя'></input>
                        {name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

                    </div>
                    <div className={s.registrationForm_field}>
                        <img className={s.registrationForm_field_image} src={phoneFieldImage}></img>
                        <input value={phone}
                        onChange={handlePhoneChange} className={`${s.registrationForm_field__input} ${errorFields.phone && s.error}`} placeholder='номер телефона'></input>
                        {phone === '' && (errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
                        {phone !== '' && checkIsValidPhone === '' && <span className={s.error_message}>Телефон должен начинаться с +...</span>}
                    </div>
                    <div className={s.registrationForm_field}>
                        <img className={s.registrationForm_field_image__mail} src={mailFieldImage}></img>
                        <input value={mail}
                        onChange={handleMailChange}  className={`${s.registrationForm_field__input}`} placeholder='почта'></input>
                        {/*mail === '' && (errorFields.mail && <span className={s.error_message}>Пожалуйста, введите почту</span>)*/}
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
                                <p className={s.passwordCharsCount}>{`${password.length}`}/10</p>
                        </div>

                    </div>    
                    <div className={s.registrationForm_button_wrapper}>
                        <Link to={(name !== '' && phone !== '' && password !== '' && password.length > 9 && checkIsValidPhone === 'true') ? '/code_verification' : '/registration'}>
                            <button onClick={() => {
                                validateFields()
                                if (name !== '' && phone !== '' && password !== '' && password.length > 9 && checkIsValidPhone === 'true'){
                                    sessionStorage.setItem('name', name)
                                    sessionStorage.setItem('phone', phone)
                                    sessionStorage.setItem('password', password)    
                                }

                                }} className={s.registrationForm_button}>Зарегистрироваться</button>
                        </Link>
                    </div>
                   {/* <div className={s.registrationForm_field__hasAccount}>
                        <span className={s.registrationForm_field__hasAccountText}>Уже есть аккаунт?</span> 
                        <Link to='/login'>
                            <span className={s.registrationForm_field__hasAccountLink}>Логин</span>
                        </Link>
                    </div> */}        
                </div>

     
    </div>

  </div>
  )
}

export default Registration
