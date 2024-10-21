import { tracksApi } from '@/api/tracksApi'
import { TrackDataType } from '@/lib/types'
import { setDislike, setLike } from '@/store/features/playlistSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'

export function useLikeTrack(track: TrackDataType) {
	const dispatch = useAppDispatch()
	const { user, tokens } = useAppSelector(state => state.user)
	const { favoritePlaylist } = useAppSelector(state => state.playlist)

	const isLiked = !!favoritePlaylist.find(el => el._id === track._id)

	const handleLike = async (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()

		if (!user || !tokens) {
			alert('Ставить лайки могут только авторизованные пользователи')
			return
		}

		const fetchAction = isLiked
			? tracksApi.deleteFavoriteTrack
			: tracksApi.addFavoriteTrack

		const storeAction = isLiked ? setDislike : setLike

		try {
			await fetchAction({
				trackId: track._id,
				access: tokens.access,
				refresh: tokens.refresh,
			})
			dispatch(storeAction(track))
		} catch (err) {
			const error = err as Error
			console.error(error.message)
		}
	}

	return {
		isLiked,
		handleLike,
	}
}
