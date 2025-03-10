import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Tweet} from '../../types/tweets';
import {tweetService} from '../../services/tweetsService';

interface TweetsState {
  tweets: Tweet[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetsState = {
  tweets: [],
  loading: false,
  error: null,
};

export const fetchTweets = createAsyncThunk<Tweet[]>(
  'tweets/fetchTweets',
  async () => {
    const response: Tweet[] = await tweetService.fetchTweets();

    return response.filter(tweet => !tweet.error);
  },
);

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    clearTweets: state => {
      state.tweets = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTweets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tweetsSlice.reducer;
