import { useLikeTrack } from '@/hooks/useLikeTrack'
import { TrackDataType } from '@/lib/types'
import { setCurrTrack, setIsPlaying } from '@/store/features/playlistSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { trackFormattedTime } from '@/utils/helpers'
import classNames from 'classnames'
import styles from './Track.module.css'

export default function Track(track: TrackDataType) {
	const dispatch = useAppDispatch()
	const { mainPlaylist, currTrack, isPlaying } = useAppSelector(
		state => state.playlist,
	)

	const { isLiked, handleLike } = useLikeTrack(track)

	const handlePlay = (track: TrackDataType, tracks: TrackDataType[]) => {
		dispatch(setCurrTrack({ currTrack: track, mainPlaylist: tracks }))
		dispatch(setIsPlaying(true))
	}

	return (
		<div
			className={styles.playlist__item}
			onClick={() => handlePlay(track, mainPlaylist)}
		>
			<div className={styles.playlist__track}>
				<div className={styles.track__title}>
					<div className={styles.track__title_image}>
						{currTrack?._id === track._id ? (
							<div
								className={
									isPlaying ? styles.playing_dot : styles.not_playing_dot
								}
							></div>
						) : (
							<svg className={styles.track__title_svg}>
								<use xlinkHref='/img/icon/sprite.svg#icon-note' />
							</svg>
						)}
					</div>
					<div>
						<a className={styles.track__title_link} href='#'>
							{track.name} <span className={styles.track__title_span} />
						</a>
					</div>
				</div>
				<div className={styles.track__author}>
					<a className={styles.track__author_link} href='#'>
						{track.author}
					</a>
				</div>
				<div className={styles.track__album}>
					<a className={styles.track__album_link} href='#'>
						{track.album}
					</a>
				</div>
				<div className={styles.track__time}>
					<div onClick={handleLike}>
						<svg
							className={classNames(
								styles.track__time_svg,
								isLiked
									? styles.like_heartbeat_animation
									: styles.dislike_jello_animation,
							)}
						>
							<use
								xlinkHref={`/img/icon/sprite.svg#${isLiked ? 'icon-like' : 'icon-dislike'}`}
							/>
						</svg>
					</div>
					<span className={styles.track__time_text}>
						{trackFormattedTime(track.duration_in_seconds)}
					</span>
				</div>
			</div>
		</div>
	)
}
