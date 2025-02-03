import layout from '@/shared/styles/layout.module.css';
import s from './user-settings.module.css'
import { nameFieldImage, phoneFieldImage } from '@/shared/assets/imageAssets';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { Navbar } from '@/shared/navbar/navbar'
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';
import { setCheckIsValidPhone, setName, setPassword, setPhone, toggleChangeMode } from '@/app/store/reducers/userSettingsReducer';
import { userApi, useValidation } from '@/shared/api';
import { selectUserSettings } from '@/app/store/reducers/selectors';

function UserSettings() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: userData, error: userError, isLoading: userLoading } = userApi.useGetUserInfoQuery();
    const [updateUserInfo] = userApi.useUpdateUserInfoMutation();
    const [deleteUserAccount] = userApi.useDeleteUserAccountMutation();
    const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);
    const { name, phone, password, checkIsValidPhone, changeMode } = useSelector(selectUserSettings);
    const { errorFields, validateFields } = useValidation(['name', 'phone', 'checkIsValidPhone']);
    const fieldValues = { name, phone, checkIsValidPhone };

    useEffect(() => {
        userData && dispatch(setName(userData.name));
        userData && dispatch(setPhone(userData.phoneNumber));
    }, [userData]);

    if (userLoading) return <div>Loading user info...</div>;

    if (userError) return <div>Error fetching user info</div>;

    return (
        <div className={s.userSettingsForm}>
            <div className={s.userSettingsForm_wrapper}>
                <BurgerMenu />
                <div className={`${layout.leftMenu_side} ${menuOpen ? layout.menuOpen : ''}`}>
                    <div className={layout.leftMenu_side_wrapper}>
                        <Navbar />
                    </div>
                </div>
                <div className={s.userSettingsForm_fields}>
                    <div className={s.userSettingsForm_header}>
                        <h1>НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ</h1>
                    </div>
                    <div className={s.userSettingsForm_field}>
                        <img className={`${s.userSettingsForm_field_image}`} src={nameFieldImage}></img>
                        <input value={name} readOnly={changeMode ? false : true}
                            onChange={e => dispatch(setName(e.target.value))} className={`${s.userSettingsForm_field__input} ${errorFields.name && s.error}`} placeholder='имя'></input>
                        {name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите логин</span>)}
                    </div>
                    <div className={s.userSettingsForm_field}>
                        <img className={s.userSettingsForm_field_image} src={phoneFieldImage}></img>
                        <input value={phone} readOnly={true}
                            onChange={(e) => {
                                const isValidPhone = /^\+/.test(e.target.value)
                                dispatch(setCheckIsValidPhone(isValidPhone ? 'true' : ''));
                                dispatch(setPhone(e.target.value));
                            }} className={`${s.userSettingsForm_field__input} ${errorFields.phone && s.error}`} placeholder='номер телефона'></input>
                        {phone === '' && (errorFields.phone && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
                    </div>
                    <div className={s.userSettingsForm_button_wrapper}>
                        <Link to={'/settings'}>
                            <button onClick={() => {
                                validateFields(fieldValues)
                                if (changeMode === true) updateUserInfo({ name })
                                dispatch(toggleChangeMode())
                            }} className={s.userSettingsForm_button}>{changeMode === true ? 'Сохранить' : 'Изменить'}</button>
                        </Link>
                        <div className={s.delete_account_wrapper}>
                            <div className={s.userSettingsForm_field}>
                                <input value={password} onChange={(e) => dispatch(setPassword(e.target.value))} className={`${s.deleteInput} ${errorFields.name && s.error}`} placeholder='Введите пароль для удаления'></input>
                            </div>
                            <p onClick={() => deleteUserAccount({ password }).then(() => navigate('/login'))} className={s.deleteAccount}>Удалить аккаунт</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings