"use client";

import React, { useState, useRef, useEffect } from 'react';

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

interface PlayerProps {
  currentTrack: Track | null; // Принимаем текущий выбранный трек, который может быть null
}

const Player: React.FC<PlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLiked, setIsLiked] = useState(false); // Для отслеживания состояния лайка
  const [isDisliked, setIsDisliked] = useState(false); // Для отслеживания состояния дизлайка

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Воспроизведение/пауза трека
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Обновление прогресса воспроизведения
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  // Устанавливаем продолжительность трека
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Устанавливаем громкость
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Обновляем трек, когда он изменяется
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.track_file; // Устанавливаем файл трека
    setIsPlaying(true);
    audioRef.current.play();
  }, [currentTrack]);

  // Логика для лайков
  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked && !isLiked) {
      setIsDisliked(false); // Если лайк поставлен, дизлайк убирается
    }
  };

  // Логика для дизлайков
  const toggleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked && !isDisliked) {
      setIsLiked(false); // Если дизлайк поставлен, лайк убирается
    }
  };

  if (!currentTrack) {
    return <div>Трек не выбран</div>;
  }

  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__player-progress">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) =>
              audioRef.current
                ? (audioRef.current.currentTime = parseFloat(e.target.value))
                : null
            }
          />
        </div>
        <div className="bar__player-block">
          <div className="bar__player player">
            <div className="player__controls">
              <div className="player__btn-prev">
                <svg className="player__btn-prev-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className="player__btn-play _btn" onClick={togglePlay}>
                <svg className="player__btn-play-svg">
                  <use
                    xlinkHref={
                      isPlaying
                        ? 'img/icon/sprite.svg#icon-pause'
                        : 'img/icon/sprite.svg#icon-play'
                    }
                  />
                </svg>
              </div>
              <div className="player__btn-next">
                <svg className="player__btn-next-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div className="player__btn-repeat _btn-icon">
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

            <div className="player__track-play track-play">
              <div className="track-play__contain">
                <div className="track-play__image">
                  <svg className="track-play__svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className="track-play__author">
                  <a className="track-play__author-link" href="#">
                    {currentTrack.name}
                  </a>
                </div>
                <div className="track-play__album">
                  <a className="track-play__album-link" href="#">
                    {currentTrack.album}
                  </a>
                </div>
              </div>

              <div className="track-play__like-dis">
                <div
                  className={`track-play__like _btn-icon ${
                    isLiked ? 'active' : ''
                  }`}
                  onClick={toggleLike}
                >
                  <svg className="track-play__like-svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div
                  className={`track-play__dislike _btn-icon ${
                    isDisliked ? 'active' : ''
                  }`}
                  onClick={toggleDislike}
                >
                  <svg className="track-play__dislike-svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={currentTrack.track_file} // Устанавливаем источник аудио
      />
    </div>
  );
};

export default Player;
