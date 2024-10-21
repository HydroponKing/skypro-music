'use client'

import {
	setIsLoop,
	setIsPlaying,
	setNextTrack,
} from '@/store/features/playlistSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { trackFormattedTime } from '@/utils/helpers'
import { memo, useEffect, useRef, useState, useCallback } from 'react'
import Controls from '../Player/Controls/Controls'
import PlayingTrack from '../Player/PlayingTrack/PlayingTrack'
import Progress from '../Progress/Progress'
import Volume from '../Volume/Volume'
import styles from './Bar.module.css'

export default memo(function Bar() {
	const { currTrack, isPlaying, isLoop } = useAppSelector(
		state => state.playlist,
	)
	const dispatch = useAppDispatch()

	const [volume, setVolume] = useState(0.5)
	const [elapsedTime, setElapsedTime] = useState(0)

	const audioRef = useRef<HTMLAudioElement | null>(null)
	const audio = audioRef.current
	const duration = audio?.duration || 0

	useEffect(() => {
		if (audio) {
			audio.volume = volume
		}
	}, [audio, volume])

	useEffect(() => {
		if (audio) {
			audio.addEventListener('ended', () => dispatch(setNextTrack()))
		}
		return () => {
			if (audio) {
				audio.removeEventListener('ended', () => dispatch(setNextTrack()))
			}
		}
	}, [audio, dispatch])

	const handleChangeVolume = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setVolume(Number(event.target.value))
		}, [])
	

	const handleChangeDuration = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (audio) {
				audio.currentTime = Number(event.target.value)
			}
		}, [])


	const handleTimeUpdate = useCallback(
		(event: React.ChangeEvent<HTMLAudioElement>) => {
			setElapsedTime(event.currentTarget.currentTime)
		},[])


	const togglePlay = useCallback(() => {
		if (audio) {
			if (isPlaying) {
				audio.pause()
				dispatch(setIsPlaying(false))
			} else {
				audio.play()
				dispatch(setIsPlaying(true))
			}
		}
	}, [audio, isPlaying, dispatch])

	const toggleLoop = useCallback(() => {
		if (audio) {
			if (isLoop) {
				audio.loop = false
				dispatch(setIsLoop(false))
			} else {
				audio.loop = true
				dispatch(setIsLoop(true))
			}
		}
	}, [audio, isLoop, dispatch])

	return (
		<div className={styles.bar}>
			<div className={styles.bar__content}>
				<div className={styles.bar__timer}>
					<p>
						{trackFormattedTime(elapsedTime)} | {trackFormattedTime(duration)}
					</p>
				</div>
				<audio
					autoPlay
					ref={audioRef}
					src={currTrack?.track_file}
					onTimeUpdate={handleTimeUpdate}
				>
					Ваш браузер не поддерживает встроенное аудио.
				</audio>
				<Progress
					max={duration}
					value={elapsedTime}
					step={0.01}
					onChange={handleChangeDuration}
				/>
				<div className={styles.bar__player_block}>
					<div className={styles.bar__player}>
						<Controls togglePlay={togglePlay} toggleLoop={toggleLoop} />
						<PlayingTrack />
					</div>
					<Volume value={volume} onChange={handleChangeVolume} />
				</div>
			</div>
		</div>
	)
})
