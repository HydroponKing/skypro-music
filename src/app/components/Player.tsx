"use client";

import React, { useState, useRef, useEffect } from 'react';

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
}

const Player: React.FC<PlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Воспроизведение/пауза трека
  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
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
    }
  }, [currentTrack]);

  return (
    <div className="bar">
      <div className="bar__content">
        {/* Прогресс трека */}
        <div className="bar__player-progress">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = parseFloat(e.target.value);
              }
            }}
          />
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
                    {currentTrack?.name || ' '}
                  </a>
                </div>
                <div className="track-play__album">
                  <a className="track-play__album-link" href="#">
                    {currentTrack?.album || ' '}
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
        src={currentTrack?.track_file || ''}
      />
    </div>
  );
};

export default Player;
