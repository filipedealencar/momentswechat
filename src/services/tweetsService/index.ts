import {apiClient} from '../api';

const TWEETS_URL =
  'https://techops-recsys-lateral-hiring.github.io/moments-data';

export const tweetService = {
  fetchTweets: async () => {
    if (TWEETS_URL) {
      return await apiClient.get(`${TWEETS_URL}/tweets.json`);
    }
  },
  fetchUser: async () => {
    if (TWEETS_URL) {
      return await apiClient.get(`${TWEETS_URL}/user.json`);
    }
  },
};
