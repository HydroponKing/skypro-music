"use client";

import React, { useState } from 'react';
import Player from './Player'; // Импортируем компонент Player

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
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null); // Состояние для текущего трека

    const handleTrackClick = (track: Track) => {
        setCurrentTrack(track); // Устанавливаем выбранный трек в состояние
    };

    return (
        <div>
            {/* Список треков */}
            <div className="content__playlist">
                {tracks.map((track) => (
                    <div
                        key={track._id}
                        className="playlist__item"
                        onClick={() => handleTrackClick(track)} // При клике на трек
                    >
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
                                <span className="track__author-link">
                                    {track.author}
                                </span>
                            </div>
                            <div className="track__album">
                                <span className="track__album-link">
                                    {track.album}
                                </span>
                            </div>
                            <div className="track__time">
                                <span className="track__time-text">
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
            {currentTrack && <Player currentTrack={currentTrack} />} {/* Передаем выбранный трек в плеер */}
        </div>
    );
};

export default PlaylistPage;
