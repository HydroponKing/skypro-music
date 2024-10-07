"use client";

import React, { useState, useRef, useEffect } from "react";

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
}

const Player: React.FC<PlayerProps> = ({
  currentTrack,
  playlist,
  currentTrackIndex,
  onTrackChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false); // Состояние повтора

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
      audioRef.current.src = currentTrack.track_file;
      setIsPlaying(false);
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  // Обработчик завершения трека
  const hadleTrackEnded = () => {
    if (audioRef.current) {
      if (isRepeating) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        if (currentTrackIndex < playlist.length - 1) {
          onTrackChange(currentTrackIndex + 1);
        } else {
          onTrackChange(0);
        }
      }
    }
  };

  //повтор
  const toggleRepeat = () => {
    setIsRepeating((prev) => !prev);
  };

  //Функция форматирования времени
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
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
              <div className="player__btn-prev">
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
              <div className="player__btn-next">
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
              <div className="player__btn-shuffle _btn-icon">
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
        onEnded={hadleTrackEnded}
        src={currentTrack?.track_file || ""}
      />
    </div>
  );
};

export default Player;
