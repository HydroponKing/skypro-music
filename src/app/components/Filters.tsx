"use client";

import React, { useState } from "react";

interface FiltersProps {
  authors: string[];
  releaseDates: string[];
  genres: string[];
}

const Filters: React.FC<FiltersProps> = ({ authors, releaseDates, genres }) => {
  const [showAuthors, setShowAuthors] = useState(false);
  const [showReleaseDates, setShowReleaseDates] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  return (
    <div>
      <h2 className="centerblock__h2">Треки</h2>
      <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
        
        {/* Кнопка "Исполнителю" */}
        <div
          className="filter__button button-author _btn-text"
          onClick={() => setShowAuthors(!showAuthors)}
        >
          исполнителю
        </div>
        {showAuthors && (
          <ul className="filter__list">
            {authors.map((author) => (
              <li key={author}>{author}</li>
            ))}
          </ul>
        )}

        {/* Кнопка "Году выпуска" */}
        <div
          className="filter__button button-year _btn-text"
          onClick={() => setShowReleaseDates(!showReleaseDates)}
        >
          году выпуска
        </div>
        {showReleaseDates && (
          <ul className="filter__list">
            {releaseDates.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        )}

        {/* Кнопка "Жанру" */}
        <div
          className="filter__button button-genre _btn-text"
          onClick={() => setShowGenres(!showGenres)}
        >
          жанру
        </div>
        {showGenres && (
          <ul className="filter__list">
            {genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;
