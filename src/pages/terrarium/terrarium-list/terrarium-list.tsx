import s from './terrarium-list.module.css'
import layout from '@/shared/styles/layout.module.css';
import { Link } from 'react-router-dom';
import { terrariumArrow, temperature, wet, down_big } from '@/shared/assets/imageAssets';
import { Navbar } from '@/shared/ui/navbar/navbar';
import { BurgerMenu } from '@/shared/ui/burger-menu/burger-menu';
import { useTerrariumListModel } from './model';

function TerrariumList() {
  const { terrariumList, userData, menuOpen, isLoading, isError } = useTerrariumListModel();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки террариумов</p>;

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
                    <div className={s.item_top}>
                      <div className={s.item_top_wrapper}>
                        <h2>{terrarium.name}</h2>
                        <div className={s.item_bottom_image}>
                          <img src={terrariumArrow}></img>
                        </div>
                      </div>
                    </div>
                    <div className={s.item_bottom_rightSide}>
                      <div className={s.item_top_temperature}>
                        <img src={temperature}></img>
                        <p>{terrarium.indicators && terrarium.indicators.temperature_cold ? `${terrarium.indicators.temperature_cold.split('.')[0]}-${terrarium.indicators.temperature_hot.split('.')[0]}` : '-'} °C </p>
                      </div>
                      <div className={s.item_bottom_humidity}>
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
