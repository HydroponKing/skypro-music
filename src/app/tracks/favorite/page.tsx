'use client'

import React from 'react'
import { useAppSelector } from '@/store/store'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import Playlist from '@/components/Playlist/PlaylistMain/Playlist'

export default function Favorite() {
	const { favoritePlaylist } = useAppSelector(state => state.playlist)

	return (
		<PrivateRoute>
			<Playlist playlist={favoritePlaylist} title={'Избранное'} />
		</PrivateRoute>
	)
}
