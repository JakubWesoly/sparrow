import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const getLikedPosts = createAsyncThunk(
  'posts/getLiked',
  async (dummy = null, thunkAPI) => {
    try {
      const response = await postsService.getLikedPosts();
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUsersPosts = createAsyncThunk(
  'posts/getUsersPosts',
  async (id, thunkAPI) => {
    try {
      const response = await postsService.getUsersPosts(id);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
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
    resetPosts: (state) => {
      state.posts = [];
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
      })
      .addCase(getLikedPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.posts = action.payload;
      })
      .addCase(getLikedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUsersPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.posts = action.payload;
      })
      .addCase(getUsersPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
