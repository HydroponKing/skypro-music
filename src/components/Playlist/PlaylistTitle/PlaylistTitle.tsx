import React from 'react'
import styles from './PlaylistTitle.module.css'
import classNames from 'classnames'

export default function PlaylistColumnTitle() {
	return (
		<div className={styles.content__title}>
			<div className={classNames(styles.playlist_title__col, styles.col01)}>
				Трек
			</div>
			<div className={classNames(styles.playlist_title__col, styles.col02)}>
				Исполнитель
			</div>
			<div className={classNames(styles.playlist_title__col, styles.col03)}>
				Альбом
			</div>
			<div className={classNames(styles.playlist_title__col, styles.col04)}>
				<svg className={styles.playlist_title__svg}>
					<use xlinkHref='/img/icon/sprite.svg#icon-watch' />
				</svg>
			</div>
		</div>
	)
}
