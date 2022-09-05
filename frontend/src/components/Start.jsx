import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sparrow from '../image/logo.png';
import Login from './Login';
import Modal from './Modal';
import Register from './Register';

const Start = () => {
  const navigate = useNavigate();

  const [loginModalShown, setLoginModalShown] = useState(false);
  const [registerModalShown, setRegisterModalShown] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/home');
  }, [navigate]);

  return (
    <>
      <div className='start'>
        <div className='start-top'>
          <div className='start-header'>
            <h1>Bądź na bieżąco ze Sparrow</h1>
            <h2>Zaloguj się lub zarejestruj</h2>
          </div>
        </div>
        <div className='start-bot'>
          <div className='start-button-container'>
            <button
              className='button-black'
              onClick={() => setLoginModalShown(true)}
            >
              Zaloguj
            </button>
            <button
              className='button-black'
              onClick={() => setRegisterModalShown(true)}
            >
              Zarejestruj
            </button>
          </div>
        </div>
        <img src={sparrow} alt='Sparrow' className='start-logo' />
      </div>
      <Modal isShown={loginModalShown} isShownHandler={setLoginModalShown}>
        <Login />
      </Modal>
      <Modal
        isShown={registerModalShown}
        isShownHandler={setRegisterModalShown}
      >
        <Register />
      </Modal>
    </>
  );
};

export default Start;
