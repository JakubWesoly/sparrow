import { useEffect, useState } from 'react';
import SettingElement from './SettingElement';

const Settings = () => {
  const [update, setUpdate] = useState(false);

  const handleClick = () => {
    setUpdate(true);
  };

  // using
  // setUpdate(true);
  // setUpdate(false);
  // didn't work so I had to do this
  useEffect(() => {
    if (update === true) {
      setUpdate(false);
    }
  }, [update]);

  return (
    <div className='settings'>
      <h1 className='settings-heading'>Settings</h1>
      <hr />
      <SettingElement
        header='Zmień nazwę'
        desc='Zmień aktualną nazwę użytkownika'
        type='text'
        setting='username'
        update={update}
      />
      <SettingElement
        header='Zmień zdjęcie'
        desc='Zmień aktualne zdjęcie profilowe'
        type='picture'
        setting='picture_url'
        update={update}
      />
      <SettingElement
        header='Zmień e-mail'
        desc='Zmień aktualny adres e-mail'
        type='text'
        setting='email'
        update={update}
      />
      <SettingElement
        header='Zmień hasło'
        desc='Zmień aktualne hasło'
        type='text'
        setting='password'
        update={update}
      />
      <SettingElement
        header="Pokaż polike'owane posty"
        desc="Zmień widoczność like'owanych postów"
        type='switch'
        setting='showLikedPosts'
        update={update}
      />
      <div className='settings-save'>
        <button className='button-primary' onClick={handleClick}>
          Zapisz zmiany
        </button>
      </div>
    </div>
  );
};

export default Settings;
