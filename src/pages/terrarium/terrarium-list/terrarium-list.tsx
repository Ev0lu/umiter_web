import s from './terrarium-list.module.css'

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import temperature from '../../../assets/temperature.svg'
import wet from '../../../assets/wet.svg'
import down_big from '../../../assets/down_big.svg'
import terrariumArrow from '../../../assets/terrariumArrow.svg'
import { Navbar } from '../../../shared/navbar/navbar';
import { getLastTerrariumLog, getTerrariumSettings, getUserInfo } from '../../../shared/api';
import { getToken } from '../../../App';




function TerrariumList() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [terrariumList, setTerrariumList] = useState([]);
    const getTerrariums = async () => {  
      const token = getToken('access');
      if (!token) {
              navigate('/login')
      };

      try {
        const response = await fetch('https://api.umiter.ru/v1/terrarium', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          const terrariumsWithSettings = await Promise.all(
            data.terrariums.map(async item => (
                [item, await getTerrariumSettings(item.id, token)]
            ))
        );
              
        const emptyTerrarium = terrariumsWithSettings.find(item => item[1].settings === null)
        if (emptyTerrarium) {
          navigate('/select_profile')
        }

        const terrariumsWithLogs = await Promise.all(
          terrariumsWithSettings.map(async item => {
              const response = (await getLastTerrariumLog(item[0].id, token));
              if (response.status === 401){
                return navigate('/login')
              } else if (response.status !== 404) {
                const data = await response.json();
                return [item, data];    
              } else if (response.status === 404) {
                return [item, {}]
              }
           })
      );
    
        setTerrariumList(terrariumsWithLogs)
        } else {
          return navigate('/login')
        }
      } catch (error) {
      }
    }
    const getUserName = async () => {
      const token = getToken('access');
      if (!token) {
              navigate('/login')
      };

      const response = await getUserInfo(token)
      const data = await response.json()
      setUserName(data.name)
    }

    useEffect(() => {
      getUserName()
      setTimeout(() => {getTerrariums(), 200})
    },[])

  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>
               <Navbar />
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                        <div className={s.profileName}>
                            <img src=''></img>
                            <p>{userName}</p>
                            <img src={down_big}></img>
                        </div>
                        <div className={s.pageTitle}>
                            <h1>Террариумы</h1>
                        </div>
                        <div className={s.grid_container}>
                        {terrariumList.map((terrarium:any, index:any) => (
                    
                           <div onClick={() => {
                            console.log(terrarium)//deleteTerrarium(terrarium.id, sessionStorage.getItem('accessToken'))
                           }} key={index} className={s.grid_item}>
                             <Link to={`/terrarium/${terrarium[0][0].id}/`}>
                                <div className={s.grid_item__leftSide}>
                                     <div className={s.grid_item__leftSide_wrapper}>

                                    <h2>{terrarium[0][0].name}</h2>
                                    <div className={s.leftSide_temperature}>
                                        <img src={temperature}></img>
                                        <p>{terrarium[1].temperature_cold ? `${terrarium[1].indicators.temperature_cold} - ${terrarium[1].indicators.temperature_hot}` : '-' } °C </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.grid_item__rightSide}>
                                    <div className={s.right_side__image}>
                                         <img src={terrariumArrow}></img>
                                    </div>
                                    
                                    <div className={s.rightSide_humidity}>
                                        <img src={wet} ></img>
                                        <p>{terrarium[1].humidity_cold ? `${terrarium[1].indicators.humidity_cold} - ${terrarium[1].indicators.humidity_hot}` : '-' } %</p>
                                    </div>
                                </div>
                                </Link>

                            </div>
                        ))}

                        

                        </div>

                      </div>
                </div>
        </div>

  </div>
  )
}

export default TerrariumList
