import s from './terrarium-list.module.css'
import layout from '@/shared/styles/layout.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { terrariumArrow, temperature, wet, down_big } from '@/shared/assets/imageAssets';
import { Navbar } from '@/shared/navbar/navbar';
import { terrariumApi, userApi } from '@/shared/api';
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';

function TerrariumList() {
  const navigate = useNavigate()
  const { data: userData, error: userError, isLoading: userLoading } = userApi.useGetUserInfoQuery();
  const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);
  const [terrariumList, setTerrariumList] = useState([]);
  const [fetchTerrariums, { data: terrariumData, isLoading: terrariumLoading, error: terrariumError }] = terrariumApi.useLazyGetTerrariumsQuery();

  useEffect(() => {
    fetchTerrariums();
  }, []);

  useEffect(() => {
    if (terrariumData) {
      setTerrariumList(terrariumData.terrariums);
      const emptyTerrarium = terrariumData.terrariums.find(item => item.profileId === null);
      if (emptyTerrarium) {
        sessionStorage.setItem('terrariumToChange', emptyTerrarium.id);
        navigate('/select_profile');
      }
    }
  }, [terrariumData]);

  terrariumLoading || userLoading && <p>Загрузка...</p>;

  terrariumError || userError && <p>Ошибка загрузки террариумов</p>;

  return (
    <div className={s.new_terrarium_form}>
      <div className={s.new_terrarium_form_wrapper}>
        <BurgerMenu />
        <div className={`${layout.leftMenu_side} ${menuOpen ? layout.menuOpen : ''}`}>
          <div className={layout.leftMenu_side_wrapper}>
            <Navbar />
          </div>
        </div>
        <div className={s.right_side}>
          <div className={s.right_side_wrapper}>
            <div className={s.profileName}>
              <img src=''></img>
              <p>{userData?.name}</p>
              <img src={down_big}></img>
            </div>
            <div className={s.pageTitle}>
              <h1>Террариумы</h1>
            </div>
            <div className={s.grid_container}>
              {terrariumList.map((terrarium: any, index: any) => (
                <div onClick={() => {
                }} key={index} className={s.grid_item}>
                  <Link to={`/terrarium/${terrarium.id}/`}>
                    <div className={s.grid_item__leftSide}>
                      <div className={s.grid_item__leftSide_wrapper}>
                        <h2>{terrarium.name}</h2>
                        <div className={s.leftSide_temperature}>
                          <img src={temperature}></img>
                          <p>{terrarium.indicators && terrarium.indicators.temperature_cold ? `${terrarium.indicators.temperature_cold.split('.')[0]}-${terrarium.indicators.temperature_hot.split('.')[0]}` : '-'} °C </p>
                        </div>
                      </div>
                    </div>
                    <div className={s.grid_item__rightSide}>
                      <div className={s.right_side__image}>
                        <img src={terrariumArrow}></img>
                      </div>
                      <div className={s.rightSide_humidity}>
                        <img src={wet} ></img>
                        <p>{terrarium.indicators && terrarium.indicators.humidity_cold ? `${terrarium.indicators.humidity_cold.split('.')[0]}-${terrarium.indicators.humidity_hot.split('.')[0]}` : '-'} %</p>
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
