import React, { useEffect } from 'react';
import SendPost from './SendPost';

import { useDispatch, useSelector } from 'react-redux';
import { getNewestPosts, resetPosts } from '../features/posts/postsSlice';
import Post from './Post';

const HomeContent = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    // dispatch(resetPosts());
    dispatch(getNewestPosts());
  }, []);

  return (
    <>
      <SendPost home />
      <div style={{ margin: '1rem 0' }}>
        <hr />
      </div>
      {posts && posts.map((post) => <Post post={post} />)}
    </>
  );
};

export default HomeContent;
