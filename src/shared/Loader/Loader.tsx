import s from './Loader.module.css'
import umiterLogo from '../../assets/loaderLogo.svg'




function Loader() {

    

  return (
  <div className={s.registrationForm}>
      <div className={s.registrationForm_wrapper}>

            <div className={s.registrationLogo}>
                    <img className={s.logotype} src={umiterLogo}></img>
                </div>


     
    </div>

  </div>
  )
}

export default Loader