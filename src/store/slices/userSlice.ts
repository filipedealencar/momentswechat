import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {tweetService} from '../../services/tweetsService';
import {User, UserState} from '../../types/user';

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk<User>('user/fetchUser', async () => {
  const response: User = await tweetService.fetchUser();

  return response;
});

// Redux Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
