import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/authSlice';
import postsReducer from '../features/posts/postsSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    search: searchReducer,
  },
});
