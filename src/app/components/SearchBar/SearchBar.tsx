"use client";

import React from "react";
import styles from "./SearchBar.module.css"; // Импортируем CSS модуль

export default function SearchBar() {
  return (
    <div className={`${styles['centerblock__search']} ${styles.search}`}>
      <svg className={styles['search__svg']}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles['search__text']}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}
