import { tracksApi } from '@/api/tracksApi'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useEffect } from 'react'

export function useInitLikedTracks() {
	const dispatch = useAppDispatch()
	const { tokens } = useAppSelector(state => state.user)

	useEffect(() => {
		if (tokens?.access) {
			dispatch(
				tracksApi.getFavoriteTracks({
					access: tokens.access,
					refresh: tokens.refresh,
				}),
			)
		}
	}, [tokens, dispatch])
}
