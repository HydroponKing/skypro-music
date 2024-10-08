"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuViseble, setIsMenuVisible] = useState<boolean>(false);
  const toggleMenu: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsMenuVisible((prevState) => !prevState);
  };
  return (
    <nav className={`${styles.main__nav} ${styles.nav}`}>
      <div className={`${styles.nav__logo} ${styles.logo}`}>
        <Image src="/img/logo.png" alt="Logo" width={113} height={17} />
      </div>
      <div
        className={`${styles.nav__burger} ${styles.burger}`}
        onClick={toggleMenu}
        style={{ cursor: "pointer" }}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isMenuViseble && (
        <div className={`${styles.nav__menu} ${styles.menu}`}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>Главное</Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>Мои треки</Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/logout" className={styles.menu__link}>Выйти</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
