"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuViseble, setIsMenuVisible] = useState<boolean>(false);
  const toggleMenu: React.MouseEventHandler<HTMLDivElement>= () => {
    setIsMenuVisible((prevState) => !prevState);
  };
  return (
    <nav className="main__nav nav">
      <div className="nav__logo logo">
        <Image src="/img/logo.png" alt="Logo" width={113} height={17} />
      </div>
      <div
        className="nav__burger burger"
        onClick={toggleMenu}
        style={{ cursor: "pointer" }}
      >
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>
      {isMenuViseble && (
        <div className="nav__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <Link href="#">Главное</Link>
            </li>
            <li className="menu__item">
              <Link href="#">Мой плейлист</Link>
            </li>
            <li className="menu__item">
              <Link href="/signin">Войти</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
