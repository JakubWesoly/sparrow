import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorMonitor } from 'stream';
import postsService from './postsService';

const posts = JSON.parse(localStorage.getItem('posts'));

const initialState = {
  posts: posts ? posts : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const createPost = createAsyncThunk(
  'posts/create',
  async (post, thunkAPI) => {
    try {
      const response = await postsService.createPost(post);
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
    // const message = await postsService.createPost(post);
    // thunkAPI.rejectWithValue(message);
  }
);

export const getNewestPosts = createAsyncThunk(
  'posts/getNewest',
  async (dummy = null, thunkAPI) => {
    try {
      const response = await postsService.getNewestPosts();
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.date.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Dodano post';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNewestPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewestPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.posts = action.payload;
      })
      .addCase(getNewestPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
