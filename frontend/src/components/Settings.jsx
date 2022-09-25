import {useEffect, useRef, useState} from 'react';
import SettingElement from './SettingElement';
import {toast} from "react-toastify";

const Settings = () => {
  const [update, setUpdate] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const toastRef = useRef(null);
  const successRef = useRef(null);
  const handleClick = () => {
    setUpdate(true);
  };

    useEffect(() => {
        if(hasFailed)
        {
            toastRef.current = toast.error('Nie udało się zaktualizować ustawień');
            setHasFailed(false);
        }
    }, [hasFailed]);
  // using
  // setUpdate(true);
  // setUpdate(false);
  // didn't work, so I had to do this
  useEffect(() => {
      setUpdate(false);
  }, [update]);

  return (
    <div className='settings'>
      <h1 className='settings-heading'>Ustawienia</h1>
      <hr />
      <SettingElement
        header='Zmień nazwę'
        desc='Zmień aktualną nazwę użytkownika'
        type='text'
        setting='username'
        update={update}
        setFailed={setHasFailed}
      />
      <SettingElement
        header='Zmień zdjęcie'
        desc='Zmień aktualne zdjęcie profilowe'
        type='picture'
        setting='picture_url'
        update={update}
        setFailed={setHasFailed}
      />
      <SettingElement
        header='Zmień e-mail'
        desc='Zmień aktualny adres e-mail'
        type='text'
        setting='email'
        update={update}
        setFailed={setHasFailed}
      />
      <SettingElement
        header='Zmień hasło'
        desc='Zmień aktualne hasło'
        type='text'
        setting='password'
        update={update}
        setFailed={setHasFailed}
      />
      <SettingElement
        header="Pokaż polike'owane posty"
        desc="Zmień widoczność like'owanych postów"
        type='switch'
        setting='showLikedPosts'
        update={update}
        setFailed={setHasFailed}
      />
      <SettingElement
        header="Usuń konto"
        desc=""
        type='button'
        setting='showLikedPosts'
        update={update}
        setFailed={setHasFailed}
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
