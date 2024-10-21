import { tracksApi } from '@/api/tracksApi'
import { TrackDataType } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PlaylistStateType = {
	mainPlaylist: TrackDataType[]
	shufflePlaylist: TrackDataType[]
	favoritePlaylist: TrackDataType[]
	selectionPlaylist: TrackDataType[]
	selectionData: { name: string; items: number[] }
	currTrack: TrackDataType | null
	isLoading: boolean
	isPlaying: boolean
	isLoop: boolean
	isShuffle: boolean
	filterOptions: {
		searchValue: string
		author: string[]
		orderData: string
		genre: string[]
	}
}

const initialState: PlaylistStateType = {
	mainPlaylist: [],
	shufflePlaylist: [],
	favoritePlaylist: [],
	selectionPlaylist: [],
	selectionData: { name: '', items: [] },
	currTrack: null,
	isLoading: true,
	isPlaying: false,
	isLoop: false,
	isShuffle: false,
	filterOptions: {
		searchValue: '',
		author: [],
		orderData: 'По умолчанию',
		genre: [],
	},
}

const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		setCurrTrack: (
			state,
			action: PayloadAction<{
				currTrack: TrackDataType
				mainPlaylist: TrackDataType[]
			}>,
		) => {
			const sortPlaylist = [...action.payload.mainPlaylist].sort(
				() => 0.5 - Math.random(),
			)

			state.currTrack = action.payload.currTrack
			state.mainPlaylist = action.payload.mainPlaylist
			state.shufflePlaylist = sortPlaylist
		},
		setLike: (state, action: PayloadAction<TrackDataType>) => {
			state.favoritePlaylist.push(action.payload)
		},
		setDislike: (state, action: PayloadAction<TrackDataType>) => {
			const filterNoFavorite = state.favoritePlaylist.filter(
				track => track._id !== action.payload._id,
			)

			state.favoritePlaylist = filterNoFavorite
		},
		setPrevTrack: state => {
			const playlist = state.isShuffle
				? state.shufflePlaylist
				: state.mainPlaylist
			const currIndex = playlist.findIndex(
				track => track._id === state.currTrack?._id,
			)

			if (!currIndex) {
				return
			}

			state.currTrack = playlist[currIndex - 1]
		},
		setNextTrack: state => {
			const playlist = state.isShuffle
				? state.shufflePlaylist
				: state.mainPlaylist
			const currIndex = playlist.findIndex(
				track => track._id === state.currTrack?._id,
			)

			if (currIndex === playlist.length - 1) {
				return
			}

			state.currTrack = playlist[currIndex + 1]
		},
		setIsPlaying: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload
		},
		setIsLoop: (state, action: PayloadAction<boolean>) => {
			state.isLoop = action.payload
		},
		setIsShuffle: (state, action: PayloadAction<boolean>) => {
			state.isShuffle = action.payload
		},
		setSearchValue: (state, action) => {
			state.filterOptions.searchValue = action.payload
		},
		setAuthor: (state, action) => {
			const value = action.payload
			const author = state.filterOptions.author

			if (author.includes(value)) {
				state.filterOptions.author = author.filter(author => author !== value)
			} else {
				author.push(value)
			}
		},
		setOrderData: (state, action) => {
			state.filterOptions.orderData = action.payload
		},
		setGenre: (state, action) => {
			const value = action.payload
			const genre = state.filterOptions.genre

			if (genre.includes(value)) {
				state.filterOptions.genre = genre.filter(genre => genre !== value)
			} else {
				genre.push(value)
			}
		},
		resetFilterOptions: state => {
			state.filterOptions = {
				author: [],
				genre: [],
				orderData: 'По умолчанию',
				searchValue: '',
			}
		},
	},

	extraReducers: builder => {
		builder
			.addCase(tracksApi.getTracks.fulfilled, (state, action) => {
				state.mainPlaylist = action.payload
				state.isLoading = false
			})
			.addCase(tracksApi.getFavoriteTracks.fulfilled, (state, action) => {
				state.favoritePlaylist = action.payload
				state.isLoading = false
			})
			.addCase(tracksApi.getSelections.fulfilled, (state, action) => {
				const filterSelection = state.mainPlaylist.filter(track => {
					return state.selectionData?.items.includes(track._id)
				})

				state.selectionPlaylist = filterSelection
				state.selectionData = action.payload
				state.isLoading = false
			})
	},
})

export const {
	setCurrTrack,
	setLike,
	setDislike,
	setPrevTrack,
	setNextTrack,
	setIsPlaying,
	setIsLoop,
	setIsShuffle,
	setSearchValue,
	setAuthor,
	setOrderData,
	setGenre,
	resetFilterOptions,
} = playlistSlice.actions
export const playlistReducer = playlistSlice.reducer
