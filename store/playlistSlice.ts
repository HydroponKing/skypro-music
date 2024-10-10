// store/playlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  currentTrackIndex: number | null;
}

const initialState: PlaylistState = {
  tracks: [], // Плейлист по умолчанию пуст
  currentTrackIndex: null, // Текущий трек не выбран
};

// Создаем slice
const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
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
});

// Экспортируем экшены
export const { setPlaylist, setCurrentTrack } = playlistSlice.actions;

// Экспортируем редьюсер
export default playlistSlice.reducer;
