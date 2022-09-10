import {
  RiHome2Line,
  RiUserFollowLine,
  RiHeartLine,
  RiUser3Line,
  RiSettings2Line,
} from 'react-icons/ri';
import PostButton from './PostButton';
import jwt from 'jsonwebtoken';
import LogOutButton from './LogOutButton';
// import sparrow from '../image/logo.png';
import { Link } from 'react-router-dom';

const HomeNavLeft = () => {
  return (
    <nav className='home-nav-left'>
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
          <Link
            to={`/profile/${
              jwt.decode(JSON.parse(localStorage.getItem('user')).token).id
            }`}
          >
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
        <LogOutButton />
      </ul>
    </nav>
  );
};

export default HomeNavLeft;
