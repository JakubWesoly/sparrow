import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/authSlice';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});
