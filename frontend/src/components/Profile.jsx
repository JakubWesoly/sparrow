import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { resetPosts, getUsersPosts } from '../features/posts/postsSlice';
import Post from './Post';
import Loading from './Loading';

import parseJWT from '../functions/parseJWT';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const handleFollow = () => {
    if (isFollowed) {
      axios.delete(`/api/users/follow/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      });
    } else {
      axios.put(
        `/api/users/follow/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }
      );
    }
    setIsFollowed(!isFollowed);
  };

  useEffect(() => {
    getUser();
    dispatch(resetPosts());
    dispatch(getUsersPosts(id));
  }, []);

  const getIsFollowed = async () => {
    const response = await axios.get(
      `/api/users/${parseJWT(localStorage.getItem('user')).id}`
    );
    if (response.data.followers)
      setIsFollowed(response.data.followers.includes(id));
    else setIsFollowed(false);
    setIsFollowed(true);
  };

  useEffect(() => {
    getIsFollowed();
  }, [user]);

  useEffect(() => {
    if (user && id !== user.id) {
      navigate(`/profile/${id}`);
      window.location.reload();
    }
  }, [id]);

  const getUser = async () => {
    setUser((await axios.get(`/api/users/${id}`)).data);
  };

  return (
    <>
      <div className='profile-info'>
        {user ? (
          <>
            <img src={user.image} alt='profile' />
            <span className='profile-info-name'>{user.name}</span>
            <span>
              Obserwujący: {parseInt(user.followed + (isFollowed ? 1 : 0))} /
              Obserwowani: {(user.followers && user.followers.length) || 0}
            </span>
            {user._id !== parseJWT(localStorage.getItem('user')).id && (
              <button
                className={isFollowed ? 'button-black' : 'button-primary'}
                onClick={() => handleFollow()}
              >
                {isFollowed ? 'Przestań obserwować' : 'Obserwuj'}
              </button>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
      <div className='profile-posts'>
        {posts ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Profile;
