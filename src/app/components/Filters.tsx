"use client";

import React, { useState, useEffect, useRef } from "react";

interface FiltersProps {
  authors: string[];
  releaseDates: string[];
  genres: string[];
}

const Filters: React.FC<FiltersProps> = ({ authors, releaseDates, genres }) => {
  const [openFilter, setOpenFilter] = useState<null | 'author' | 'releaseDate' | 'genre'>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setOpenFilter(null); // Закрыть все фильтры
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filtersRef}>
      <h2 className="centerblock__h2">Треки</h2>
      <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
        
        {/* Контейнер для кнопки и списка "Исполнителю" */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            className="filter__button button-author _btn-text"
            onClick={() => setOpenFilter(openFilter === 'author' ? null : 'author')}
          >
            исполнителю
          </div>
          {openFilter === 'author' && (
            <ul className="filter__list">
              {authors.map((author) => (
                <li key={author}>{author}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Контейнер для кнопки и списка "Году выпуска" */}
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '16px' }}>
          <div
            className="filter__button button-year _btn-text"
            onClick={() => setOpenFilter(openFilter === 'releaseDate' ? null : 'releaseDate')}
          >
            году выпуска
          </div>
          {openFilter === 'releaseDate' && (
            <ul className="filter__list">
              {releaseDates.map((date) => (
                <li key={date}>{date}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Контейнер для кнопки и списка "Жанру" */}
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '16px' }}>
          <div
            className="filter__button button-genre _btn-text"
            onClick={() => setOpenFilter(openFilter === 'genre' ? null : 'genre')}
          >
            жанру
          </div>
          {openFilter === 'genre' && (
            <ul className="filter__list">
              {genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};


export default Filters;
