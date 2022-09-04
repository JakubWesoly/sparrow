import React from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };
  return (
    <button
      className='button-black home-nav-left-logout'
      onClick={handleLogout}
    >
      <RiLogoutBoxRLine />
      <span>Wyloguj się</span>
    </button>
  );
};

export default LogOutButton;
