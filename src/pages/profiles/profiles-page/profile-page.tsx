import s from './profile-page.module.css'
import { useState, useEffect } from 'react'
import { terrariumApi } from '@/shared/api';
import { useNavigate } from 'react-router-dom';
import { searchImage } from '@/shared/assets/imageAssets';

function ProfilesPage() {
  const navigate = useNavigate();
  const { data: terrariumData, refetch } = terrariumApi.useGetTerrariumsQuery();
  const [setTerrariumProfile] = terrariumApi.useSetTerrariumProfileMutation();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [terrariumId, setTerrariumId] = useState<string>('');

  useEffect(() => {
    if (terrariumData) {
      const emptyTerrarium = terrariumData.terrariums.find(item => item.profileName === null);
      if (emptyTerrarium) sessionStorage.setItem('terrariumToChange', emptyTerrarium?.id);
      const storedTerrariumId = sessionStorage.getItem('terrariumToChange') || emptyTerrarium?.id;
      if (storedTerrariumId) setTerrariumId(storedTerrariumId);
    }
  }, [terrariumData]);

  const { data: profilesData } = terrariumApi.useGetProfilesQuery(terrariumId, { skip: !terrariumId });

  useEffect(() => {
    (profilesData?.profiles) && setFilteredProfiles(profilesData.profiles);
  }, [profilesData]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (profilesData?.profiles) {
      const filtered = profilesData.profiles.filter((profile: any) => profile.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredProfiles(filtered);
    }
  };

  const connectProfile = async (profileId: string) => {
    await setTerrariumProfile({ terId: terrariumId, profileId }).unwrap();
    await refetch()
    if (sessionStorage.getItem('terrariumToChange')) {
      navigate(`/terrarium/${sessionStorage.getItem('terrariumToChange')}/settings`);
    } else {
      navigate(`/terrarium_info`);
    }
  };

  return (
    <div className={s.new_terrarium_form}>
      <div className={s.new_terrarium_form_wrapper}>
        <div className={s.right_side}>
          <div className={s.right_side_wrapper}>
            <div className={s.pageTitle}>
              <h1>Вид питомца</h1>
            </div>
            <div className={s.profileList}>
              <div className={s.registration_form_field}>
                <img className={`${s.registration_form_field_image}`} src={searchImage}></img>
                <input value={searchQuery} style={{ marginBottom: '10px' }}
                  onChange={(e) => { handleSearchInputChange(e) }} className={`${s.filteredSearchInput}`} placeholder='Поиск'></input>
              </div>

              {filteredProfiles && filteredProfiles.map((item: any) => (
                <div onClick={() => {
                  connectProfile(item.id)
                }} className={s.profile_item} key={item.id}>
                  <div className={s.profile_name}>{item.name}</div>
                  <div className={s.arrowimg}>{`>`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div onClick={() => {
          sessionStorage.setItem('terrariumId', terrariumId)
          navigate('/create/custom_profile')
        }} className={`${s.profile_item} ${s.fixedItem}`}>
          <div className={s.profile_name}>Другое</div>
          <div className={s.arrowimg}>{`>`}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfilesPage
