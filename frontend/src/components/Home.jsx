import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomeContent from './HomeContent';

import HomeNavLeft from './HomeNavLeft';
import HomeNavRight from './HomeNavRight';
import Liked from './Liked';
import Profile from './Profile';

const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className='home'>
      <HomeNavLeft />
      <main className='home-main'>
        <Routes>
          <Route path='/home' element={<HomeContent />} />
          <Route path='/liked' element={<Liked />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </main>
      <HomeNavRight />
    </div>
  );
};

export default Home;
