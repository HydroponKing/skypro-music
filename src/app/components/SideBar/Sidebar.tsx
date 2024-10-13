"use client";

import React from "react";
import Image from "next/image";
import styles from "./Sidebar.module.css"; // Импортируем CSS модуль
import { useSelector, useDispatch } from "react-redux";
import { getUserState } from "store/userSlice";
import { setUser } from "store/userSlice";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Registry from "../Registry/Registry";
import Login from '../Login/Login';


export default function Sidebar() {
  const user = useSelector(getUserState)
  const [openRegistry, setOpenRegistry] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)  
  const dispatch = useDispatch()
  
  function auth  (){
    const user = JSON.parse(localStorage.getItem('user') as string);    
    if(user){
      dispatch(setUser(user))
    }
  }  

  useEffect(() => {
    auth()
  }, [])

  return (
    <aside className={`${styles['main__sidebar']}`}>
      <div className={styles['sidebar__personal']}>
        {user 
        ? <> 
          <p className={styles['sidebar__personal-name']}>{user.username}</p>
          <div className={styles['sidebar__icon']} onClick={() => {localStorage.removeItem('user'); window.location.reload()}}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </>
        : <div>
          <button onClick={() => setOpenRegistry(!openRegistry) }>Registry</button>
          <button onClick={() => setOpenLogin(!openLogin) }>Login</button>
        </div>
        }
       
      </div>
      <div className={styles['sidebar__block']}>
        <div className={styles['sidebar__list']}>
          <div className={styles['sidebar__item']}>
            <a className={styles['sidebar__link']} href="#">
              <Image src="/img/playlist01.png" alt="day's playlist" width={250} height={150} />
            </a>
          </div>
          <div className={styles['sidebar__item']}>
            <a className={styles['sidebar__link']} href="#">
              <Image src="/img/playlist02.png" alt="day's playlist" width={250} height={150} />
            </a>
          </div>
          <div className={styles['sidebar__item']}>
            <a className={styles['sidebar__link']} href="#">
              <Image src="/img/playlist03.png" alt="day's playlist" width={250} height={150} />
            </a>
          </div>
        </div>
      </div>
           {openRegistry && createPortal(<Registry open={openRegistry} setOpen={setOpenRegistry} />, document.body)}
           {openLogin && createPortal(<Login open={openLogin} setOpen={setOpenLogin} />, document.body)}
    </aside>
  );
}
