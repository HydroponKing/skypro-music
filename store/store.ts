// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import currentTrackReducer from './currentTrackSlice';
import playlistReducer from './playlistSlice';  // Импортируем редьюсер плейлиста
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    currentTrack: currentTrackReducer,
    playlist: playlistReducer,  
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
