import {
	setIsPlaying,
	setIsShuffle,
	setNextTrack,
	setPrevTrack,
} from '@/store/features/playlistSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import classNames from 'classnames'
import styles from './Controls.module.css'

type Props = {
	togglePlay: () => void
	toggleLoop: () => void
}

export default function Controls({ togglePlay, toggleLoop }: Props) {
	const { isPlaying, isLoop, isShuffle } = useAppSelector(
		state => state.playlist,
	)
	const dispatch = useAppDispatch()

	const switchPrevTrack = () => {
		dispatch(setPrevTrack())
		dispatch(setIsPlaying(true))
	}

	const switchNextTrack = () => {
		dispatch(setNextTrack())
		dispatch(setIsPlaying(true))
	}

	const toggleShuffle = () => {
		dispatch(setIsShuffle(isShuffle ? false : true))
	}

	return (
		<div className={styles.player__controls}>
			<div className={styles.player__btn_prev} onClick={switchPrevTrack}>
				<svg className={styles.player__btn_prev_svg}>
					<use xlinkHref='/img/icon/sprite.svg#icon-prev' />
				</svg>
			</div>
			<div
				className={classNames(styles.player__btn_play, styles._btn)}
				onClick={togglePlay}
			>
				<svg className={styles.player__btn_play_svg}>
					<use
						xlinkHref={`/img/icon/sprite.svg#${isPlaying ? 'icon-pause' : 'icon-play'}`}
					/>
				</svg>
			</div>
			<div className={styles.player__btn_next} onClick={switchNextTrack}>
				<svg className={styles.player__btn_next_svg}>
					<use xlinkHref='/img/icon/sprite.svg#icon-next' />
				</svg>
			</div>
			<div
				className={classNames(styles.player__btn_repeat, styles._btn_icon)}
				onClick={toggleLoop}
			>
				<svg
					className={classNames(styles.player__btn_repeat_svg, {
						[styles.active_btn]: isLoop,
					})}
				>
					<use xlinkHref='/img/icon/sprite.svg#icon-repeat' />
				</svg>
			</div>
			<div
				className={classNames(styles.player__btn_shuffle, styles._btn_icon)}
				onClick={toggleShuffle}
			>
				<svg
					className={classNames(styles.player__btn_shuffle_svg, {
						[styles.active_btn]: isShuffle,
					})}
				>
					<use xlinkHref='/img/icon/sprite.svg#icon-shuffle' />
				</svg>
			</div>
		</div>
	)
}
