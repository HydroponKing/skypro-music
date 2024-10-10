// app/store/tracksSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTracks as fetchTracksAPI } from '../components/api';

export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: {
    type: string;
    data: any[];
  };
  track_file: string;
  staredUser: number[];
}

interface TracksState {
  tracks: Track[];
  currentTrackIndex: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  currentTrackIndex: null,
  loading: false,
  error: null,
};

// Асинхронный thunk для получения треков
export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async () => {
  const response = await fetchTracksAPI();
  return response;
});

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrackIndex(state, action: PayloadAction<number | null>) {
      state.currentTrackIndex = action.payload;
    },
    // Дополнительные редюсеры при необходимости
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<Track[]>) => {
        state.tracks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке треков';
      });
  },
});

export const { setCurrentTrackIndex } = tracksSlice.actions;

export default tracksSlice.reducer;
