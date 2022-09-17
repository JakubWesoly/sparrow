import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchFunction } from './searchService';

const initialState = {
  result: { users: [], posts: [] },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const search = createAsyncThunk(
  '/search/search',
  async (query, thunkAPI) => {
    try {
      return (await searchFunction(query)).data;
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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
        state.result = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = searchSlice.actions;

export default searchSlice.reducer;
