import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RiHeartAddLine, RiHeartFill } from 'react-icons/ri';

import {useSpring, animated} from "react-spring";
import Loading from "./Loading";

const Post = (props) => {
  const { post } = props;
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(post.likes);

  const animation = useSpring({
    from: { opacity: 0, right: '-5%' },
    to: { opacity: user ? 1 : 0, right: user ? '0' : '-5%' },
  });

  const [isLiked, setIsLiked] = useState(props.isLiked || false);

  const getUser = async (userId) => {
    setUser((await axios.get(`/api/users/${userId}`)).data);
  };

  const handleLike = async () => {
    await axios.post(
      `/api/posts/like/${post._id}`,
      {
        mode: isLiked ? -1 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      }
    );
  };

  useEffect(() => {
    getUser(post.author);
  }, []);

  return (
      <>
      {user ? <animated.div style={{...animation}} className='post'>
      <div className='post-top'>
        <Link to={`/profile/${user && user._id}`}>
          <img src={user && user.image} alt='profile' />
          <span>{user && user.name} | </span>
        </Link>
        <span> {post.createdAt.substr(0, 10)}</span>
      </div>
      <div className='post-content'>{post.content}</div>
      <div className='post-bottom'>
        <button
          className='button-like'
          onClick={() => {
            handleLike();
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);
          }}
          style={isLiked ? { color: '#ff0000' } : {}}
        >
          {isLiked ? <RiHeartFill /> : <RiHeartAddLine />} {likes}
        </button>
      </div>
    </animated.div> : <Loading/>}
          </>
  );
};

export default Post;
