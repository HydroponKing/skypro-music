'use client'

import { tracksApi } from '@/api/tracksApi'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useEffect } from 'react'
import Playlist from '../Playlist/PlaylistMain/Playlist'

export default function Main() {
	const dispatch = useAppDispatch()
	const { mainPlaylist } = useAppSelector(state => state.playlist)

	useEffect(() => {
		try {
			dispatch(tracksApi.getTracks())
		} catch (err) {
			const error = err as Error
			console.error(error.message)
			throw new Error(error.message)
		}
	}, [dispatch])

	return (
		<>
			<Playlist playlist={mainPlaylist} title={'Треки'} />
		</>
	)
}
