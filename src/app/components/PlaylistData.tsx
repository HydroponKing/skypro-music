"use client";

import React, { useState, useEffect, useRef } from "react";
import Filters from "./Filters";
import Player from "./Player"; // Импортируем Player для управления треками
import { fetchTracks } from "./api"; // Импортируем функцию для получения треков

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
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null); // Состояние для текущего трека

  const playlistRef = useRef<HTMLDivElement | null>(null); // для прокрутки

  useEffect(() => {
    const getTracks = async () => {
      try {
        const trackData = await fetchTracks();
        setTracks(trackData);

        const uniqueAuthors = [...new Set(trackData.map((track: Track) => track.author))];
        const uniqueReleaseDates = [...new Set(trackData.map((track: Track) => track.release_date))];
        const uniqueGenres = [...new Set(trackData.flatMap((track: Track) => track.genre))];

        setAuthors(uniqueAuthors);
        setReleaseDates(uniqueReleaseDates);
        setGenres(uniqueGenres);
        setLoading(false);
      } catch (err: unknown) {
        setError(handleError(err));
        setLoading(false);
      }
    };

    getTracks();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track); // Устанавливаем выбранный трек
  };

  return (
    <div>
      <Filters authors={authors} releaseDates={releaseDates} genres={genres} />
      <div className="content__title playlist-title">
        <div className="playlist-title__col col01">Трек</div>
        <div className="playlist-title__col col02">Исполнитель</div>
        <div className="playlist-title__col col03">Альбом</div>
        <div className="playlist-title__col col04">
          <svg className="playlist-title__svg">
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className="content__playlist" ref={playlistRef}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          tracks.map((track) => (
            <div key={track._id} className="playlist__item" onClick={() => handleTrackClick(track)}>
              <div className="playlist__track track">
                <div className="track__title">
                  <div className="track__title-image">
                    <svg className="track__title-svg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className="track__title-text">
                    <span className="track__title-link">
                      {track.name}
                    </span>
                  </div>
                </div>
                <div className="track__author">
                  <span className="track__author-link">{track.author}</span>
                </div>
                <div className="track__album">
                  <span className="track__album-link">{track.album}</span>
                </div>
                <div className="track__time">
                  <span className="track__time-text">
                    {formatDuration(track.duration_in_seconds)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Компонент Player будет воспроизводить текущий трек */}
      {currentTrack && <Player currentTrack={currentTrack} />} {/* Передаем текущий выбранный трек */}
    </div>
  );
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const handleError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  }
  return new Error("Произошла неизвестная ошибка");
};
