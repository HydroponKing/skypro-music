"use client";

import React, { useState, useEffect, useRef } from "react";
import Player from "../Player/Player"; // Импортируем Player для управления треками
import Filters from "../Filters/Filters";
import { fetchTracks } from "../api";
import styles from "./PlaylistData.module.css";
import { useSelector, useDispatch } from 'react-redux';  // Импортируем хуки Redux
import { RootState } from '../../store/store';  // Импорт типа состояния
import { setCurrentTrack } from '../../store/currentTrackSlice';  // Импорт экшена

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

export const PlaylistData: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isPlaying, setIsPlayingStatus] = useState<boolean>(false)

  const dispatch = useDispatch();  // Для отправки экшенов
  const currentTrackIndex = useSelector((state: RootState) => state.currentTrack.trackIndex);  // Получаем индекс текущего трека из Redux

  useEffect(() => {
    const getTracks = async () => {
      try {
        const trackData = await fetchTracks();
        setTracks(trackData);

        const uniqueAuthors = [
          ...new Set(trackData.map((track: Track) => track.author)),
        ];
        const uniqueReleaseDates = [
          ...new Set(trackData.map((track: Track) => track.release_date)),
        ];
        const uniqueGenres = [
          ...new Set(trackData.flatMap((track: Track) => track.genre)),
        ];

        setAuthors(uniqueAuthors);
        setReleaseDates(uniqueReleaseDates);
        setGenres(uniqueGenres);
        setLoading(false);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err : new Error("Произошла неизвестная ошибка")
        );
        setLoading(false);
      }
    };

    getTracks();
  }, []);

  const handleTrackClick = (index: number) => {
    dispatch(setCurrentTrack(index)); // Устанавливаем индекс выбранного трека
  };

  const handleTrackChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < tracks.length) {
     dispatch(setCurrentTrack(newIndex));
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Filters authors={authors} releaseDates={releaseDates} genres={genres} />
      <div className={`${styles['content__title']} ${styles['playlist-title']}`}>
        <div className={`${styles['playlist-title__col']} ${styles['col01']}`}>Трек</div>
        <div className={`${styles['playlist-title__col']} ${styles['col02']}`}>Исполнитель</div>
        <div className={`${styles['playlist-title__col']} ${styles['col03']}`}>Альбом</div>
        <div className={`${styles['playlist-title__col']} ${styles['col04']}`}>
          <svg className={styles['playlist-title__svg']}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles['content__playlist']}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          tracks.map((track, index) => (
            <div
              key={track._id}
              className={styles['playlist__item']}
              onClick={() => handleTrackClick(index)}
            >
              <div className={`${styles['playlist__track']} ${styles.track}`}>
                <div className={styles['track__title']}>
                  <div className={styles['track__title-image']}>
                    <svg className={styles['track__title-svg']}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                    {currentTrackIndex == index &&(
                      <div
                      className={`${styles['current-track-dot']} ${
                        isPlaying ? styles['pulsate'] : ""
                      }`}
                    ></div>
                    )}
                  </div>
                  <div className={styles['track__title-text']}>
                    <span className={styles['track__title-link']}>{track.name}</span>
                  </div>
                </div>
                <div className={styles['track__author']}>
                  <span className={styles['track__author-link']}>{track.author}</span>
                </div>
                <div className={styles['track__album']}>
                  <span className={styles['track__album-link']}>{track.album}</span>
                </div>
                <div className={styles['track__time']}>
                  <span className={styles['track__time-text']}>
                    {Math.floor(track.duration_in_seconds / 60)}:
                    {track.duration_in_seconds % 60 < 10
                      ? `0${track.duration_in_seconds % 60}`
                      : track.duration_in_seconds % 60}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Player рендерится один раз и обновляет трек при выборе */}
      {currentTrackIndex !== null && (
        <Player
          currentTrack={tracks[currentTrackIndex]} // текущий трек
          playlist={tracks} // весь плейлист
          currentTrackIndex={currentTrackIndex} // индекс текущего трека
          onTrackChange={handleTrackChange} // функция смены трека
          updatePlayingStatus={setIsPlayingStatus}
        />
      )}
    </div>
  );
};

export default PlaylistData;
