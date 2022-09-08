import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { resetPosts, getUsersPosts } from '../features/posts/postsSlice';
import Post from './Post';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    getUser();
    dispatch(resetPosts());
    dispatch(getUsersPosts(id));
  }, []);

  const getUser = async () => {
    setUser((await axios.get(`/api/users/${id}`)).data);
  };

  return (
    <>
      <div className='profile-info'>
        {user && (
          <>
            <img src={user.image} alt='profile' />
            <span className='profile-info-name'>{user.name}</span>
            <span>
              Obserwujący: {user.followerCount} / Obserwowani: {user.followed}
            </span>
            <button className='button-primary'>Obserwuj</button>
          </>
        )}
      </div>
      <hr />
      <div className='profile-posts'>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default Profile;
