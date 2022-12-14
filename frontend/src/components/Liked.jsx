import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedPosts, resetPosts } from '../features/posts/postsSlice';

import Post from './Post';

const Liked = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(getLikedPosts());
  }, []);

  return (
    <div>
      {posts && posts.map((post) => <Post post={post} isLiked={true} />)}
    </div>
  );
};

export default Liked;
