import { Link } from 'react-router-dom';

const UserElement = (props) => {
  return (
    <Link to={`/profile/${props.user._id}`} className='user-element'>
      <img src={props.user.picture_url} alt='profile' />
      <h3>{props.user.username}</h3>
    </Link>
  );
};

export default UserElement;
