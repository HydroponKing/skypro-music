"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Player.module.css";


// Интерфейс для трека
interface Track {
  _id: number;
  name: string;
  author: string;
  track_file: string;
  album: string;
}

interface PlayerProps {
  currentTrack: Track | null;
  playlist: Track[];
  currentTrackIndex: number;
  onTrackChange: (newIndex: number) => void;
  updatePlayingStatus: (isPlaying: boolean) => void;
}

const Player: React.FC<PlayerProps> = ({
  currentTrack,
  playlist,
  currentTrackIndex,
  onTrackChange,
  updatePlayingStatus,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false); 
  const [isShuffling, setIsShuffling] = useState(false); // состояние перемешивания
  

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Воспроизведение/пауза трека
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      updatePlayingStatus(!isPlaying);
    }
  };

  // Обновление времени трека
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Установка продолжительности трека
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Изменение прогресса (перемотка трека)
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Установка громкости
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Обновление трека при изменении текущего трека
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      setIsPlaying(false);
      audioRef.current.play();
      setIsPlaying(true);
      updatePlayingStatus(true);
    }
  }, [currentTrack]);



// Функция для переключения режима повтора
const toggleRepeat = () => {
  setIsRepeating((prev) => {
    const newState = !prev;
    if (newState) {
      setIsShuffling(false); // Отключаем shuffle при включении repeat
    }
    return newState;
  });
};

// Функция для переключения режима перемешивания
const toggleSuffle = () => {
  setIsShuffling((prev) => {
    const newState = !prev;
    if (newState) {
      setIsRepeating(false); // Отключаем repeat при включении shuffle
    }
    return newState;
  });
};

  //Функция форматирования времени
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  
  const handlePrev = () => {
    if (currentTrackIndex > 0) {
      onTrackChange(currentTrackIndex - 1)
    }
  };

    // Обработчик завершения трека с учётом shuffle
  const handleTrackEnded = () => {
    if (isRepeating) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (isShuffling) { // Проверяем, активен ли shuffle
      if (playlist.length > 0) {
        let nextIndex = Math.floor(Math.random() * playlist.length);
        // Убеждаемся, что следующий трек не тот же самый
        while (nextIndex === currentTrackIndex && playlist.length > 1) {
          nextIndex = Math.floor(Math.random() * playlist.length);
        }
        onTrackChange(nextIndex);
      }
    } else {
      if (currentTrackIndex < playlist.length - 1) {
        onTrackChange(currentTrackIndex + 1);
      }/* else {
        onTrackChange(0);
      }*/
    }
  };

  // функции handleNext для учёта shuffle
  const handleNext = () => {
    if (isShuffling) { // Проверяем, активен ли shuffle
      if (playlist.length > 0) {
        let nextIndex = Math.floor(Math.random() * playlist.length);
        // Убеждаемся, что следующий трек не тот же самый
        while (nextIndex === currentTrackIndex && playlist.length > 1) {
          nextIndex = Math.floor(Math.random() * playlist.length);
        }
        onTrackChange(nextIndex);
      }
    } else {
      if (currentTrackIndex < playlist.length - 1) {
        onTrackChange(currentTrackIndex + 1);
      } /*else {
        onTrackChange(0);
      }*/
    }
  };


  return (
    <div className="bar">
      <div className="bar__content">
        {/* Прогресс трека */}
        <div className="progress-container">
          <span className="current-time">{formatTime(currentTime)}</span>
          <div
            className="styled-progress-container"
            onClick={handleProgressClick}
          >
            <div
              className="styled-progress-bar"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="total-time">{formatTime(duration)}</span>
        </div>
        {/* Элементы управления плеером */}
        <div className="bar__player-block">
          <div className="bar__player player">
            <div className="player__controls">
              <div className="player__btn-prev" onClick={handlePrev}>
                <svg className="player__btn-prev-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className="player__btn-play _btn" onClick={togglePlay}>
                <img
                  src={isPlaying ? "/img/icon/pause.svg" : "/img/icon/play.svg"}
                  alt={isPlaying ? "Pause" : "Play"}
                  className="player__btn-icon"
                />
              </div>
              <div className="player__btn-next" onClick={handleNext}>
                <svg className="player__btn-next-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                className={`player__btn-repeat _btn-icon ${
                  isRepeating ? "active" : ""
                }`}
                onClick={toggleRepeat}
              >
                <svg className="player__btn-repeat-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div
                className={`player__btn-shuffle _btn-icon ${isShuffling ? "active" : ""}`} // Используем обычные классы
                onClick={toggleSuffle} // Вызываем функцию переключения shuffle
              >
                <svg className="player__btn-shuffle-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>

            {/* Информация о треке */}
            <div className="player__track-play track-play">
              <div className="track-play__contain">
                <div className="track-play__image">
                  <svg className="track-play__svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className="track-play__author">
                  <a className="track-play__author-link" href="#">
                    {currentTrack?.name || " "}
                  </a>
                </div>
                <div className="track-play__album">
                  <a className="track-play__album-link" href="#">
                    {currentTrack?.album || " "}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Громкость */}
          <div className="bar__volume-block volume">
            <div className="volume__content">
              <div className="volume__image">
                <svg className="volume__svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>
              <div className="volume__progress _btn">
                <input
                  className="volume__progress-line _btn"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={
                    { "--value": volume } as React.CSSProperties
                  } /* Передаём значение для прогресса */
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Аудио элемент */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
        src={currentTrack?.track_file || ""}
      />
    </div>
  );
};

export default Player;
