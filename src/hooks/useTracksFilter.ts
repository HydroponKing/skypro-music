import { TrackDataType } from '@/lib/types'
import { useAppSelector } from '@/store/store'
import useMemo from 'react';

export const useTracksFilter = (playlist: TrackDataType[]) => {
	const { filterOptions } = useAppSelector(state => state.playlist)

	function foo () {
		let initPlaylist = playlist

		if (filterOptions.searchValue) {
			initPlaylist = initPlaylist.filter(track =>
				track.name
					.toLowerCase()
					.includes(filterOptions.searchValue.toLowerCase()),
			)
		}
		if (filterOptions.author.length) {
			initPlaylist = initPlaylist.filter(track =>
				filterOptions.author.includes(track.author),
			)
		}
		if (filterOptions.genre.length) {
			initPlaylist = initPlaylist.filter(track =>
				track.genre.some(genre => filterOptions.genre.includes(genre)),
			)
		}

		if (filterOptions.orderData === 'Сначала новые') {
			initPlaylist = initPlaylist
				.slice()
				.sort(
					(a, b) =>
						new Date(b.release_date).getTime() -
						new Date(a.release_date).getTime(),
				)
		} else if (filterOptions.orderData === 'Сначала старые') {
			initPlaylist = initPlaylist
				.slice()
				.sort(
					(a, b) =>
						new Date(a.release_date).getTime() -
						new Date(b.release_date).getTime(),
				)
		}

		return initPlaylist
	}
	
	
	const tracksFilter =  foo()
	

	return tracksFilter
}
