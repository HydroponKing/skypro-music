// src/store/features/trackSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TrackStateType = {
  currentTrackIndex: number | null;  // Индекс текущего трека
};

const initialState: TrackStateType = {
  currentTrackIndex: null,  // Начальное состояние, трек не выбран
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;  // Устанавливаем индекс трека
    },
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
