// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import currentTrackReducer from './currentTrackSlice';

const store = configureStore({
  reducer: {
    currentTrack: currentTrackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
