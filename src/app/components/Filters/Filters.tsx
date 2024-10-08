"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Filters.module.css";

interface FiltersProps {
  authors: string[];
  releaseDates: string[];
  genres: string[];
}

const Filters: React.FC<FiltersProps> = ({ authors, releaseDates, genres }) => {
  const [openFilter, setOpenFilter] = useState<null | 'author' | 'releaseDate' | 'genre'>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  // Закрыть список при клике вне его
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
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={`${styles.centerblock__filter} ${styles.filter}`}>
        <div className={styles.filter__title}>Искать по:</div>
        
        {/* Контейнер для кнопки и списка "Исполнителю" */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            className={`${styles.filter__button} ${styles['button-author']} ${styles['_btn-text']} ${openFilter === 'author' ? styles.active : ''}`}
            onClick={() => setOpenFilter(openFilter === 'author' ? null : 'author')}
          >
            исполнителю
          </div>
          {openFilter === 'author' && (
            <div className={styles.filter__list_container}>
              <ul className={styles.filter__list}>
                {authors.map((author) => (
                  <li key={author}>{author}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Контейнер для кнопки и списка "Году выпуска" */}
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '16px' }}>
          <div
            className={`${styles.filter__button} ${styles['button-year']} ${styles['_btn-text']} ${openFilter === 'releaseDate' ? styles.active : ''}`}
            onClick={() => setOpenFilter(openFilter === 'releaseDate' ? null : 'releaseDate')}
          >
            году выпуска
          </div>
          {openFilter === 'releaseDate' && (
            <div className={styles.filter__list_container}>
              <ul className={styles.filter__list}>
                {releaseDates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Контейнер для кнопки и списка "Жанру" */}
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '16px' }}>
          <div
            className={`${styles.filter__button} ${styles['button-genre']} ${styles['_btn-text']} ${openFilter === 'genre' ? styles.active : ''}`}
            onClick={() => setOpenFilter(openFilter === 'genre' ? null : 'genre')}
          >
            жанру
          </div>
          {openFilter === 'genre' && (
            <div className={styles.filter__list_container}>
              <ul className={styles.filter__list}>
                {genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
