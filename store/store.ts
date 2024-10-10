// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import currentTrackReducer from './currentTrackSlice';
import playlistReducer from './playlistSlice';  // Импортируем редьюсер плейлиста

const store = configureStore({
  reducer: {
    currentTrack: currentTrackReducer,
    playlist: playlistReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
