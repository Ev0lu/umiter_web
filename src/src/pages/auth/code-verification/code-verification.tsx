import { useLoginUser } from "@/shared/api/index";
import { authApi, useCodeVerification } from "@/shared/api/auth";
import { Link } from "react-router-dom";
import s from "./code-verification.module.css";
import { setToken } from "@/features/auth/tokens";
import { umiterLogo } from "@/shared/assets/imageAssets";
import CodeInputBox from "@/shared/ui/code-input-box/code-input-box";

function CodeVerification() {
  const {
    agreement,
    setAgreement,
    isVerified,
    code,
    handleCodeChange,
    handleKeyDown,
    seconds,
    resetTimer,
    incorrectCode,
    handlePaste
  } = useCodeVerification();

  const { handleLogin } = useLoginUser();
  const [registerUser, { }] = authApi.useRegisterUserMutation()

  return (
    <div className={s.registration_form}>
      <div className={s.registration_form_wrapper}>
        <div className={s.registrationLogo}>
          <img className={s.logotype} src={umiterLogo} alt="Logo" />
        </div>
        <div className={s.registration_form_fields}>
          <h1 className={s.registration_form_header}>ПОДТВЕРЖДЕНИЕ</h1>
          <p className={s.header_text}>
            Введите последние 4 цифры входящего номера телефона
          </p>
          <p className={s.header_text}>{sessionStorage.getItem("phone")}</p>

          <div className={s.code_verification}>
            <div className={s.code_input}>
              {code.map((value, index) => (
                <CodeInputBox
                  key={index}
                  onPaste={handlePaste}
                  id={`code-box-${index}`}
                  value={value}
                  onChange={(val) => handleCodeChange(index, val)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  incorrectCode={incorrectCode}
                />
              ))}
            </div>
          </div>

          <div className={s.radio_gender}>
            <input
              type="radio"
              id="agreement"
              name="agreement"
              checked={agreement}
              onChange={setAgreement}
            />
            <span className={s.registration_form_field__hasAccountText__agreement}>
              Я принимаю
            </span>
            <Link to="/login">
              <span className={s.registration_form_field__hasAccountLink__agreement}>
                Правила и Соглашения
              </span>
            </Link>
          </div>

          <div className={s.registration_form_button_wrapper}>
            {seconds > 0 ? (
              <>
                <p style={{ color: "grey", fontSize: "14px" }}>
                  Если код не придёт, можно получить новый через {seconds} сек.
                </p>
                <button disabled className={s.registration_form_button__again__disabled}>
                  Отправить код заново
                </button>
              </>
            ) : (
              <button onClick={resetTimer} className={s.registration_form_button__again}>
                Отправить код заново
              </button>
            )}
          </div>

          {isVerified && agreement && (
            <div className={s.registration_form_button_wrapper}>
              <button onClick={async () => {
                const user = {
                  password: sessionStorage.getItem("password"),
                  phoneNumber: sessionStorage.getItem("phone"),
                  linkId: sessionStorage.getItem("linkId"),
                  name: sessionStorage.getItem("name"),
                };

                await registerUser(user);
                await handleLogin({
                  phoneNumber: user.phoneNumber,
                  password: user.password,
                  onSuccess: (data) => {
                    setToken("access", data.accessToken);
                    setToken("refresh", data.refreshToken);
                  },
                });
              }} className={s.registration_form_button}>
                Войти
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeVerification;