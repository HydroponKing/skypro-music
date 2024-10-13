// store/playlistSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get } from 'node_modules/axios/index.cjs';
import { fetchGetFavoriteTracks } from 'src/app/components/api';

// Интерфейс для трека
interface Track {
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

interface PlaylistState {
  tracks: Track[];
  favoriteTracks: any[];
  currentTrackIndex: number | null;
  error : Error | null
}

export const getFavoriteTracksChunk = createAsyncThunk('playlist/getFavoriteTracks', async () => {
  return await fetchGetFavoriteTracks()
})

const initialState: PlaylistState = {
  tracks: [], // Плейлист по умолчанию пуст
  favoriteTracks: [],
  currentTrackIndex: null, // Текущий трек не выбран
  error: null
};

// Создаем slice
const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  selectors: {
    getFavoriteTracks : (state) => state.favoriteTracks,
  },
  reducers: {
    // Сохраняем треки в Redux store
    setPlaylist(state, action: PayloadAction<Track[]>) {
      state.tracks = action.payload;
    },
    // Устанавливаем текущий трек
    setCurrentTrack(state, action: PayloadAction<number>) {
      state.currentTrackIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteTracksChunk.pending, (state) => {
      state.favoriteTracks = []
    }).addCase(getFavoriteTracksChunk.rejected, (state, action) => {
      state.error = action.error as Error || new Error('Произошла неизвестная ошибка')
    })
    .addCase(getFavoriteTracksChunk.fulfilled, (state, action) => {
      state.favoriteTracks = action.payload.data.data      
    })
  }
});

// Экспортируем экшены
export const { setPlaylist, setCurrentTrack } = playlistSlice.actions;
export const {getFavoriteTracks} = playlistSlice.selectors

// Экспортируем редьюсер
export default playlistSlice.reducer;
