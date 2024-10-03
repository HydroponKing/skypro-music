"use client";

import React, { useState, useEffect, useRef } from "react";
import Filters from "./Filters";
import { fetchTracks } from "./api"; // Импортируем функцию из нового файла

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

export const PlaylistData = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const playlistRef = useRef<HTMLDivElement | null>(null); // для прокрутки

  useEffect(() => {
    const getTracks = async () => {
      try {
        const trackData = await fetchTracks(); // Используем новую функцию для запроса данных
        setTracks(trackData);

        // Получение уникальных значений для авторов, годов и жанров
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
        setError(handleError(err));
        setLoading(false);
      }
    };

    getTracks();
  }, []);

  // Своровал код полностью с интернета хз как это работает но работает ^^
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (playlistRef.current) {
        playlistRef.current.scrollTop += e.deltaY;
      }
    };

    const playlistElement = playlistRef.current;
    if (playlistElement) {
      playlistElement.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (playlistElement) {
        playlistElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);
  //непонятный код кончается :)

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          <div>Loading...</div> // Можно заменить на скелетон позже
        ) : (
          tracks.map((track) => (
            <div key={track._id} className="playlist__item">
              <div className="playlist__track track">
                <div className="track__title">
                  <div className="track__title-image">
                    <svg className="track__title-svg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className="track__title-text">
                    <a className="track__title-link" href={track.track_file}>
                      {track.name}
                    </a>
                  </div>
                </div>
                <div className="track__author">
                  <a className="track__author-link" href="#">
                    {track.author}
                  </a>
                </div>
                <div className="track__album">
                  <a className="track__album-link" href="#">
                    {track.album}
                  </a>
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
