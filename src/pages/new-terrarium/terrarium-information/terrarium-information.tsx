import s from './terrarium-information.module.css';
import { useTerrariumInfoModel } from './model';

function TerrariumInfo() {
  const { timezones, timezone, setTimezone, name, setName, errorFields, handleSave } = useTerrariumInfoModel();

  return (
    <div className={s.registration_form}>
      <div className={s.registration_form_wrapper}>
        <div className={s.registration_form_fields}>
          <div style={{ width: '400px', textAlign: 'center', height: '100px' }} className={s.registration_form_header}>
            <h1 style={{ lineHeight: '33px' }}>ДОБАВЛЕНИЕ НОВОГО ТЕРРАРИУМА</h1>
          </div>
          <p style={{ color: 'white', fontWeight: '600', fontFamily: 'Formular' }}>Назовите питомца</p>
          <div className={s.registration_form_field}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${s.registration_form_field__input} ${errorFields.name ? s.error : ''}`}
              placeholder="Имя питомца"
            />
            {name === '' && errorFields.name && <span className={s.error_message}>Пожалуйста, введите имя</span>}
          </div>
          <p style={{ color: 'white', fontWeight: '600', fontFamily: 'Formular' }}>Введите текущее время</p>
          <div className={s.registration_form_field__password}>
            <select onChange={(e) => setTimezone(e.target.value)} className={s.registration_form_field__input} value={timezone}>
              <option value="">Выберите таймзону</option>
              {timezones.map((item) => (
                <option key={item} style={{ width: '300px' }} value={item.split(' ')[0]}>
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

export default TerrariumInfo;
