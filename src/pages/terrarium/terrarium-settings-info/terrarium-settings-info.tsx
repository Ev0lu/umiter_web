import s from './terrarium-settings-info.module.css';
import { useTerrariumSettingsInfoModel } from './model';

function TerrariumSettingsInfo() {
  const {
    timezones,
    timezone,
    setTimezone,
    name,
    setName,
    handleSave,
    isLoading,
    isError,
  } = useTerrariumSettingsInfoModel();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки данных</p>;

  return (
    <div className={s.registration_form}>
      <div className={s.registration_form_wrapper}>
        <div className={s.registration_form_fields}>
          <div className={s.registration_form_header} style={{ width: '400px', textAlign: 'center', height: '100px' }}>
            <h1 style={{ lineHeight: '33px' }}>НАСТРОЙКИ ТЕРРАРИУМА</h1>
          </div>

          <p className={s.label}>Переименовать питомца</p>
          <div className={s.registration_form_field}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={s.registration_form_field__input}
              placeholder="Имя питомца"
            />
          </div>

          <p className={s.label}>Выберите таймзону террариума</p>
          <div className={s.registration_form_field__password}>
            <select onChange={(e) => setTimezone(e.target.value)} className={s.registration_form_field__input} value={timezone}>
              <option value="">{timezone || 'Выберите таймзону'}</option>
              {timezones.map((item, index) => (
                <option key={index} value={item.split(' ')[0]}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={s.registration_form_button_wrapper}>
            <button onClick={handleSave} className={s.registration_form_button}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerrariumSettingsInfo;
