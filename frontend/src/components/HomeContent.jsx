import React, { useEffect } from 'react';
import SendPost from './SendPost';

import { useDispatch, useSelector } from 'react-redux';
import { getNewestPosts } from '../features/posts/postsSlice';

const HomeContent = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getNewestPosts());
    console.log(posts);
  }, []);

  return (
    <>
      <SendPost home />
      <div style={{ margin: '1rem 0' }}>
        <hr />
      </div>
    </>
  );
};

export default HomeContent;
