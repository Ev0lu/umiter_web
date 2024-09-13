import s from './code-verification.module.css'
import umiterLogo from '../../assets/LOGO_varelmo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { checkCorrectCode, getPhoneCode } from '../../shared/api';



function CodeVerification() {
    const navigate = useNavigate()


    const getCodeThroughPhone = async () => {
      let data = {
        recipient: sessionStorage.getItem('phone'),
        linkId: sessionStorage.getItem('linkId'),
        validate: false
    };
    await getPhoneCode(data)
}

    useEffect(() => {
      getCodeThroughPhone()
    }, [])

    const [agreement, setAgreement] = useState<string>('false')   
    const handleAgreementChange = (event:any) => {
            if (agreement === 'true') {
                setAgreement('false')
            } else {
                setAgreement(event.target.value);
            }
    };


    const [isVerified, setIsVerified] = useState(false);
    const [tries, setTries] = useState(0)

    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');

    useEffect(() => {
        if (code1 != '' && code2 != '' && code3 != '' && code4 != ''){
          handleSubmit()
        }
      }, [code4])


      const handleCodeChange = (index: any, value: any) => {
        switch (index) {
          case 0:
            setCode1(value.toUpperCase());
            break;
          case 1:
            setCode2(value.toUpperCase());
            break;
          case 2:
            setCode3(value.toUpperCase());
            break;
          case 3:
            setCode4(value.toUpperCase());
            break;
          default:
            break;
        }
        if (value.length === 1) {
          const nextIndex:any = index + 1;
          if (nextIndex < 4) {
            document.getElementById(`code-box-${nextIndex}`).focus();
          }
        }
      };
    
      const handleKeyPress = (event:any) => {
        if (event.key === 'Backspace' && event.target.value === '') {
          const prevIndex:any = event.target.id.split('-')[2] - 1;
          if (prevIndex >= 0) {
            document.getElementById(`code-box-${prevIndex}`).focus();
          }
        }
      };

      
    
    const handlePaste = (e:any) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        if (pasteData.length === 4) {
          setCode1(pasteData[0].toUpperCase());
          setCode2(pasteData[1].toUpperCase());
          setCode3(pasteData[2].toUpperCase());
          setCode4(pasteData[3].toUpperCase());
        }
      };
    
      const handleSubmit = () => {
        const code = `${code1}${code2}${code3}${code4}`;
    
        if (code.length === 4) {
            checkCode()
            setTries(tries + 1)
        }  
      };
      
const checkCode = async () => {
        let data = {
          recipient: sessionStorage.getItem('phone'), 
          code: `${code1}${code2}${code3}${code4}`,
          linkId: sessionStorage.getItem('linkId')
        };
        const response = await checkCorrectCode(data)
        if (response.status === 200) {
          console.log('CODE IS CORRECT')
          setIsVerified(true)

        } else {
          setIncorrectCode(true)
          setTimeout(() => setIncorrectCode(false), 3000)
          setCode1('')
          setCode2('')
          setCode3('')
          setCode4('')
        }
 }

    const [ seconds, setSeconds ] = useState(60);
    const [ timerActive, setTimerActive ] = useState(true);
  

    useEffect(() => {
        if (seconds > 0 && timerActive) {
          setTimeout(setSeconds, 1000, seconds - 1);
        } else {
          setTimerActive(false);
        }
      }, [ seconds, timerActive ]);


    const [incorrectCode, setIncorrectCode] = useState(false)


    const registerUser = async () => {  
        let user = {
          password: sessionStorage.getItem('password'), 
          phoneNumber: sessionStorage.getItem('phone'), 
          linkId: sessionStorage.getItem('linkId'),
          name: sessionStorage.getItem('name')
        };
      
        try {
          const response = await fetch('https://api.umiter.ru/v1/public/user', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
          console.log('0')

          if (response.status === 201) {
            console.log('1')
            console.log('2')

            navigate("/terrarium_list")
            console.log('3')


          } else {
            navigate("/login")

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
                        <h1>ПОДТВЕРЖДЕНИЕ</h1>
                    </div>
                    <div className={s.header_text}>
                        <p>Код был отправлен на телефон</p>
                        <p>{`${sessionStorage.getItem('phone')}`}</p>
                    </div>  
                    <div className={s.code_verification}>
                    <div className={s.code_input}>
                    <input
                      id="code-box-0"
                      autoComplete="off"
                      value={code1}
                      onChange={(e) => handleCodeChange(0, e.target.value)}
                      className={s.code_box}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={handleKeyPress}
                      maxLength={1}
                      onPaste={(e) => handlePaste(e)}
                      style={{ width: 'auto', padding: '10px', maxWidth: 60, backgroundColor: '#181818', border: 'none', borderBottom: incorrectCode ? '1px solid #FF756E' : '1px solid white', outline: 'none', color: 'white' }} // Add this line
                    />
                    <input
                      id="code-box-1"
                      autoComplete="off"

                      value={code2}
                      onChange={(e) => handleCodeChange(1, e.target.value)}
                      className={s.code_box}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={handleKeyPress}
                      maxLength={1}
                      style={{ width: 'auto', padding: '10px', maxWidth: 60, backgroundColor: '#181818', border: 'none', borderBottom: incorrectCode ? '1px solid #FF756E' : '1px solid white', outline: 'none', color: 'white' }} // Add this line
                    />
                    <input
                      id="code-box-2"

                      value={code3}
                      onChange={(e) => handleCodeChange(2, e.target.value)}
                      className={s.code_box}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={handleKeyPress}
                      maxLength={1}
                      style={{ width: 'auto', padding: '10px', maxWidth: 60, backgroundColor: '#181818', border: 'none', borderBottom: incorrectCode ? '1px solid #FF756E' : '1px solid white', outline: 'none', color: 'white' }} // Add this line
                    />
                    <input
                      id="code-box-3"

                      value={code4}
                      onChange={(e) => handleCodeChange(3, e.target.value)}
                      className={s.code_box}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={handleKeyPress}
                      maxLength={1}
                      style={{ width: 'auto', padding: '10px', maxWidth: 60, backgroundColor: '#181818', border: 'none', borderBottom: incorrectCode ? '1px solid #FF756E' : '1px solid white', outline: 'none', color: 'white' }} // Add this line
                    />
                  </div>                        </div> 
                    <div className={s.radio_gender}>
                        <input type="radio" id="agreement" name="agreement" value='true' checked={agreement === 'true'} onChange={handleAgreementChange} />
                        <span className={s.registrationForm_field__hasAccountText__agreement}>Я принимаю</span> 
                        <Link to='/login'>
                            <span className={s.registrationForm_field__hasAccountLink__agreement}>Правила и Соглашения</span>
                        </Link>
                    </div>
                   {seconds
                    ? 
                        <div style={{display: isVerified === false ? '' : 'none'}} className={s.registrationForm_button_wrapper}>
                            <p style={{color: 'grey', fontFamily: 'Formular', maxWidth: '250px', marginBottom: '10%', fontSize: '14px'}}>Если код не придёт, можно получить новый через {seconds} сек.</p>
                            <button disabled={true} className={s.registrationForm_button__again}>Отправить код заново</button>
                        </div>
                    :  
                        <div style={{display: isVerified === false ? '' : 'none'}} className={s.registrationForm_button_wrapper}>

                             <button onClick={() => {
                                setSeconds(60)
                                getCodeThroughPhone()
                                setTimerActive(!timerActive)
                                
                                }} className={s.registrationForm_button__again__disabled}>Отправить код заново</button>
                         </div>    
                }
                    <div style={{display: (isVerified === true && agreement === 'true') ? '' : 'none'}} className={s.registrationForm_button_wrapper}>
                            <button onClick={async () => await registerUser()}  className={s.registrationForm_button}>Войти</button>
                    </div>
     
                </div>

     
    </div>

  </div>
  )
}

export default CodeVerification