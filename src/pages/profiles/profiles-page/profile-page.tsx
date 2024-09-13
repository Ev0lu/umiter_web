import s from './profile-page.module.css'
import { useState, useEffect } from 'react'
import { getProfiles, setTerrariumProfile } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../App';
import searchImage from '../../../assets/Shape.svg'

function ProfilesPage() {
  const [name, setName] = useState('');

  const [profiles, setProfiles] = useState([]);

  const getAllProfiles = async (terrariumId) => {
      const token = getToken('access');
      if (!token) {
        navigate('/login')
      };
      const response = await getProfiles(token, terrariumId)
      if (response.ok) {
          const data = await response.json()
          setProfiles(data.profiles)
          setFilteredProfiles(data.profiles)
      }
  }

  const [terrariumId, setTerrariumId] = useState('');

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
              [item]
          ))
      );

        const emptyTerrarium = terrariumsWithSettings.find(item => item[0].profileName === null)
        if (localStorage.getItem('terrariumToChange')) {
          await getAllProfiles(localStorage.getItem('terrariumToChange'))
          setTerrariumId(localStorage.getItem('terrariumToChange'))
        }
        if (emptyTerrarium[0].id) {
          await getAllProfiles(emptyTerrarium[0].id)
          sessionStorage.setItem('lastProfile', emptyTerrarium[0].id)
          setTerrariumId(emptyTerrarium[0].id)
        }
      } else {
        navigate('/login')
      }

    } catch (error) {

    }
  }

  const setProfilesForEmptyTerrarium = async () => {
    await getTerrariums()
  } 

  useEffect(() => {
    setTimeout(() => setProfilesForEmptyTerrarium(), 1000)
  }, [])

  const navigate = useNavigate()

  const connectProfile = async (id: any) => {
    const token = getToken('access');
    if (!token) {
            navigate('/login')
    };
    await setTerrariumProfile(terrariumId,  id, token)
    if (localStorage.getItem('terrariumToChange')) {
      navigate(`/terrarium/${localStorage.getItem('terrariumToChange')}/settings`)
      localStorage.removeItem('terrariumToChange')    
    } else {
      navigate('/terrarium_info')
    }
  }

  const [filteredProfiles, setFilteredProfiles] = useState<any>()

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchQuery(value);

      // Filter kisses based on search query
      const filtered = profiles.filter(
          (product:any) => {
                  return product.name.toLowerCase().includes(value.toLowerCase())

      }
      );
      setFilteredProfiles(filtered);
  };



  return (
  <div className={s.newTerrariumForm}>
        <div className={s.newTerrariumForm_wrapper}>
                <div className={s.rightQR_side}>
                      <div className={s.rightQR_side_wrapper}>
                        <div className={s.pageTitle}>
                                <h1>Вид питомца</h1>
                        </div>
                        <div className={s.profileList}>
                          <div className={s.registrationForm_field}>
                            <img className={`${s.registrationForm_field_image}`} src={searchImage}></img>
                            <input value={searchQuery} style={{marginBottom: '10px'}}
                            onChange={(e) => {handleSearchInputChange(e)}} className={`${s.filteredSearchInput}`}  placeholder='Поиск'></input>
                          </div>

                          {filteredProfiles && filteredProfiles.map((item:any) => (
                              <div onClick={() => {
                                
                                  connectProfile(item.id)
                                }} className={s.profile_item} key={item.id}>
                                 <div className={s.profile_name}>{item.name}</div>
                                 <div className={s.arrowimg}>{`>`}</div>
                              </div>
                            ))}
                                                          <input value={name}
                        onChange={(e) => {setName(e.target.value)}} className={`${s.registrationForm_field__input}`}  placeholder='Или введите название и нажмите на другое'></input>

                              <div onClick={() => {
                                if (name !== ''){
                                  sessionStorage.setItem('name', name)
                                  sessionStorage.setItem('terrariumId', terrariumId)

                                  navigate('/create/custom_profile')
                                }
                                
                              }} className={s.profile_item}>
                                 <div className={s.profile_name}>Другое</div>
                                 <div className={s.arrowimg}>{`>`}</div>
                              </div>

                            </div>
                      </div>

                </div>
        </div>

  </div>
  )
}

export default ProfilesPage
