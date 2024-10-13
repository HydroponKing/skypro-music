import React from "react";
import { PlaylistData } from "../PlaylistData/PlaylistData";
import styles from "./Playlist.module.css";
import { PlaylistFovourite } from "../PlaylistFavourite/PlaylistFavourite";

export default function Playlist() {
  return (
    <div className={`${styles['centerblock__content']} ${styles['playlist-content']}`}>
      <PlaylistData />
    </div>
  );
}
