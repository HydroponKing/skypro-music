"use client";

import React, { useState } from "react";
import Player from "./Player"; // Импортируем компонент Player

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

// Пример списка треков
const tracks: Track[] = [
  // ... массив с треками
];

const PlaylistPage: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number| null>(null); // Состояние для текущего трека

  // Обработка клика на трек в плейлисте
  const handleTrackClick = (trackIndex: number) => {
    setCurrentTrackIndex(trackIndex); // Устанавливаем выбранный трек в состояние
  };

  // Функция для смены трека
  const handleTrackChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < tracks.length) {
      setCurrentTrackIndex(newIndex); // Сменить на новый трек, если индекс валидный
    }
  };

  return (
    <div>
      {/* Список треков */}
      <div className="content__playlist">
        {tracks.map((track, index) => (
          <div
            key={track._id}
            className="playlist__item"
            onClick={() => handleTrackClick(index)} // При клике на трек
          >
            <div className="playlist__track track">
              <div className="track__title">
                <div className="track__title-image">
                  <svg className="track__title-svg">
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <span className="track__title-link">{track.name}</span>
                </div>
              </div>
              <div className="track__author">
                <span className="track__author-link">{track.author}</span>
              </div>
              <div className="track__album">
                <span className="track__album-link">{track.album}</span>
              </div>
              <div className="track__time">
                <span className="track__time-text ">
                  {Math.floor(track.duration_in_seconds / 60)}:
                  {track.duration_in_seconds % 60 < 10
                    ? `0${track.duration_in_seconds % 60}`
                    : track.duration_in_seconds % 60}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Плеер */}
      {currentTrackIndex !== null && (
        <Player
          currentTrack={tracks[currentTrackIndex]} // Передаем текущий трек
          playlist={tracks} // Передаем плейлист
          currentTrackIndex={currentTrackIndex} // Передаем индекс текущего трека
          onTrackChange={handleTrackChange} // Передаем функцию смены трека
        />
      )}
    </div>
  );
};

export default PlaylistPage;
