// app/api.ts
import axios from "axios";

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

// Функция для получения данных треков
export const fetchTracks = async (): Promise<Track[]> => {
  try {
    const response = await axios.get(
      "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/"
    );
    return response.data.data;
  } catch (error: unknown) {
    throw handleError(error);
  }
};

// Обработка ошибки
const handleError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  }
  return new Error("Произошла неизвестная ошибка");
};
