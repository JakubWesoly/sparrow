import {
  RiHome2Line,
  RiUserFollowLine,
  RiHeartLine,
  RiUser3Line,
  RiSettings2Line,
} from 'react-icons/ri';
import PostButton from './PostButton';
import LogOutButton from './LogOutButton';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import SearchBar from './SearchBar';

import parseJWT from '../functions/parseJWT';

const HomeNavLeft = () => {
  const [animate, setAnimate] = useState(false);
  const burgerLine = useRef(null);
  const burger = useRef(null);
  const nav = useRef(null);
  const currentUserID = JSON.parse(localStorage.getItem('user'));

  const handleBurger = () => {
    setAnimate(!animate);
    burger.current.classList.toggle('active');
    burgerLine.current.classList.toggle('active');
    nav.current.classList.toggle('active');
  };

  return (
    <>
      <nav className='home-nav-left' ref={nav}>
        <ul className='home-nav-left-list'>
          <li className='home-nav-left-list-item'>
            <Link to='/home'>
              <RiHome2Line className='home-nav-left-list-item-icon' />
              Strona Główna
            </Link>
          </li>
          <li className='home-nav-left-list-item'>
            <Link to='/followed'>
              <RiUserFollowLine className='home-nav-left-list-item-icon' />
              Obserwowane
            </Link>
          </li>
          <li className='home-nav-left-list-item'>
            <Link to='/liked'>
              <RiHeartLine className='home-nav-left-list-item-icon' />
              Polubione
            </Link>
          </li>
          <li className='home-nav-left-list-item'>
            <Link to={`/profile/${parseJWT(localStorage.getItem('user')).id}`}>
              <RiUser3Line className='home-nav-left-list-item-icon' />
              Profil
            </Link>
          </li>
          <li className='home-nav-left-list-item'>
            <Link to='/settings'>
              <RiSettings2Line className='home-nav-left-list-item-icon' />
              Ustawienia
            </Link>
          </li>
          <PostButton />
          <SearchBar classes='home-nav-left-search' />
          <LogOutButton />
        </ul>
      </nav>
      <button
        className='home-nav-left-hamburger'
        ref={burger}
        onClick={handleBurger}
      >
        <span className='home-nav-left-hamburger-line' ref={burgerLine}></span>
      </button>
    </>
  );
};

export default HomeNavLeft;
