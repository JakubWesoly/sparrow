import React, { useEffect } from 'react';
import SendPost from './SendPost';

import { useDispatch, useSelector } from 'react-redux';
import { getNewestPosts, resetPosts } from '../features/posts/postsSlice';
import Post from './Post';
import Loading from "./Loading";

const HomeContent = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(getNewestPosts());
  }, []);

  return (
    <>
        {posts ? posts.map((post) => <Post post={post} />) : <Loading lowOpacity/>}
    </>
  );
};

export default HomeContent;
