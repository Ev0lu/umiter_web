import s from './user-settings.module.css'
//import mailFieldImage from '../../assets/mailField.svg'
import nameFieldImage from '../../assets/nameField.svg'
import phoneFieldImage from '../../assets/phoneField.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Navbar } from '../../shared/navbar/navbar'
import { getToken } from '../../App';
import { deleteUserAccount, getUserInfo, updateUserInfo } from '../../shared/api';


function UserSettings() {
    const [password, setPassword] = useState('')
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    //const [mail, setMail] = useState<string>('');  

    const [changeMode, setChangeMode] = useState(false)

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

    /*const handleMailChange = (event:any) => {
        setMail(event.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(event.target.value);
        if (isValidEmail === true) {
            setCheckValidMail('true')
        } else{
            setCheckValidMail('')
        }
    };*/

    const [errorFields, setErrorFields] = useState({
        name: false,
        phone: false,
        checkIsValidPhone: false,
        checkUniqueLoginPhone: false
    });

    const [checkIsValidPhone,setCheckIsValidPhone] = useState('')
    const [checkUniqueLoginPhone, ] = useState('')
    //const [checkValidMail,setCheckValidMail] = useState('')

    const validateFields = () => {
        const errors = {
            name: name === '',
            phone: phone === '',
            checkIsValidPhone: checkIsValidPhone === '',
            checkUniqueLoginPhone: checkUniqueLoginPhone === ''
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };


    const getUser = async () => {
        const token = getToken('access');
        const response = await getUserInfo(token)
        const data = await response.json()
        setName(data.name)
        setPhone(data.phoneNumber)
      }
    
    useEffect(() => {
        getUser()
    }, [])


    const updateUserSettingsInfo = async () => {
        const token = getToken('access');
        const data = {
            "name": name
        }
        await updateUserInfo(data, token)
    }

    const deleteUser = async () => {
        const token = getToken('access');

        const data = {
            "password": password
        }
        await deleteUserAccount(data, token)
    }

    const navigate = useNavigate()

  return (
  <div className={s.userSettingsForm}>
      <div className={s.userSettingsForm_wrapper}>

                <Navbar />

                <div className={s.userSettingsForm_fields}>
                    <div className={s.userSettingsForm_header}>
                        <h1>НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ</h1>
                    </div>
                    <div className={s.userSettingsForm_field}>
                        <img className={`${s.userSettingsForm_field_image}`} src={nameFieldImage}></img>
                        <input value={name} readOnly={changeMode ? false : true}
                        onChange={handleChangeName} className={`${s.userSettingsForm_field__input} ${errorFields.name && s.error}`} placeholder='имя'></input>
                        {name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

                    </div>
                    <div className={s.userSettingsForm_field}>
                        <img className={s.userSettingsForm_field_image} src={phoneFieldImage}></img>
                        <input value={phone} readOnly={true}
                        onChange={handlePhoneChange} className={`${s.userSettingsForm_field__input} ${errorFields.phone && s.error}`} placeholder='номер телефона'></input>
                        {phone === '' && (errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
                    </div>
                    {/*<div className={s.userSettingsForm_field}>
                        <img className={s.userSettingsForm_field_image__mail} src={mailFieldImage}></img>
                        <input value={mail}
                        onChange={handleMailChange}  className={`${s.userSettingsForm_field__input} ${errorFields.mail && s.error}`} placeholder='почта'></input>
                        {mail === '' && (errorFields.mail && <span className={s.error_message}>Пожалуйста, введите почту</span>)}
                    </div>*/}
  
                    <div className={s.userSettingsForm_button_wrapper}>
                        <Link to={'/settings'}>
                            <button onClick={async () => {
                                validateFields()
                                if (changeMode === true) {
                                    await updateUserSettingsInfo()
                                    setChangeMode(false)
                                } else {
                                    setChangeMode(true)
                                }

                                }} className={s.userSettingsForm_button}>{changeMode === true ? 'Сохранить' : 'Изменить'}</button>
                        </Link>
                        <p onClick={async () => {
                            await deleteUser()
                            navigate('/login')
                            }} className={s.deleteAccount}>Удалить аккаунт</p>  
                        <div className={s.userSettingsForm_field}>
                            <input value={password} 
                            onChange={(e) => setPassword(e.target.value)} className={`${s.deleteInput} ${errorFields.name && s.error}`} placeholder='Введите пароль для удаления'></input>
                        </div> 

                    </div>  
                </div>  
        </div>
  </div>
  )
}

export default UserSettings
