"use client";

import React, { useState, useEffect } from "react";
import Player from "../Player/Player";
import FiltersFavourite from "../FiltersFavourite/FiltersFavourite"
import { fetchTracks } from "../api";
import styles from "../PlaylistData/PlaylistData.module.css";
import { useSelector, useDispatch } from 'react-redux';  // для работы с Redux
import { AppDispatch, RootState } from '../../../../store/store';
import { getFavoriteTracks, getFavoriteTracksChunk, setCurrentTrack, setPlaylist } from '../../../../store/playlistSlice';

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

export const PlaylistFovourite: React.FC = () => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<Error | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isPlaying, setIsPlayingStatus] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();  // Хук для отправки экшенов в Redux
  const tracks = useSelector((state: RootState) => state.playlist.tracks);  // Получаем плейлист из Redux store
  const currentTrackIndex = useSelector((state: RootState) => state.playlist.currentTrackIndex);  // Индекс текущего трека
  const favoriteTracks : any[] = useSelector(getFavoriteTracks);  // Избранные треки
  useEffect(() => {
    //  функция получен треков с API
    const getTracks = async () => {
      try {
        // данные с API
        const trackData = await fetchTracks();

        dispatch(setPlaylist(trackData));


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
  }, [dispatch]); 

  // Получаем favoriteTracks 
  // ///////////////////////////////////////////////////////
  useEffect(() => {
    async function getFavoriteTracks(){
      try {
        dispatch(getFavoriteTracksChunk())
      } catch (err) {
        console.log(err);
      }
    }

    getFavoriteTracks()
  }, [dispatch])
  console.log(favoriteTracks);
  
  // ///////////////////////////////////////////////////////


  const handleTrackClick = (index: number) => {
    dispatch(setCurrentTrack(index)); // Устанавливаем индекс выбранного трека в Redux
  };


  const handleTrackChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < tracks.length) {
      dispatch(setCurrentTrack(newIndex));
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return ( <div>
      <FiltersFavourite authors={authors} releaseDates={releaseDates} genres={genres} />

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
                    {currentTrackIndex == index && (
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
                {favoriteTracks.some((favoriteTrack : any) => track._id === favoriteTrack._id)
                  ? <svg><use xlinkHref="/img/icon/sprite.svg#icon-like"></use></svg>
                  : <svg><use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use></svg>
                }
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

      {currentTrackIndex !== null && (
        <Player
          currentTrack={tracks[currentTrackIndex]}
          playlist={tracks}
          currentTrackIndex={currentTrackIndex}
          onTrackChange={handleTrackChange}
          updatePlayingStatus={setIsPlayingStatus}
        />
      )}
    </div>
  );
};

export default PlaylistFovourite;
