import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedPosts, resetPosts } from '../features/posts/postsSlice';
import Post from './Post';

const Followed = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(getFollowedPosts(JSON.parse(localStorage.getItem('user')).token));
  }, []);

  return (
    <div>
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Followed;
