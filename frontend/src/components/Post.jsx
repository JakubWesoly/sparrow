import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  RiHeartAddLine,
  RiHeartFill,
  RiShareForwardLine,
  RiShareForwardFill,
} from 'react-icons/ri';

const Post = (props) => {
  const { post } = props;
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(post.likes);
  const [shares, setShares] = useState(post.reposts);

  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  const getUser = async (userId) => {
    setUser((await axios.get(`/api/users/${userId}`)).data);
  };

  const handleLike = async () => {
    axios.post(
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
    <div className='post'>
      <div className='post-top'>
        <img src={user && user.image} alt='profile' />
        <span>{user && user.name} | </span>
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
        <button
          className='button-share'
          onClick={() => {
            setIsReposted(!isReposted);
            setShares(isReposted ? shares - 1 : shares + 1);
          }}
          style={isReposted ? { color: 'lime' } : {}}
        >
          {isReposted ? <RiShareForwardFill /> : <RiShareForwardLine />}{' '}
          {shares}
        </button>
      </div>
    </div>
  );
};

export default Post;
