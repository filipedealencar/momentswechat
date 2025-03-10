import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tweetsReducer from './slices/tweetsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    tweets: tweetsReducer,
    user: userReducer,
  },
});

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
});
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
