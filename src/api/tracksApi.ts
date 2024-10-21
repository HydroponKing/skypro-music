import { fetchWithAuth } from '@/utils/helpers'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'https://webdev-music-003b5b991590.herokuapp.com'

export const tracksApi = {
	getTracks: createAsyncThunk('tracks/getTracks', async () => {
		try {
			const resp = await fetch(`${baseUrl}/catalog/track/all/`, {
				method: 'GET',
			})
			const respData = await resp.json()

			if (!resp.ok) {
				throw new Error(respData.message)
			}

			return respData.data
		} catch (err) {
			const error = err as Error
			console.error(error.message)
			throw new Error(error.message)
		}
	}),

	getFavoriteTracks: createAsyncThunk(
		'tracks/getFavorite',
		async ({ access, refresh }: { access: string; refresh: string }) => {
			try {
				const resp = await fetchWithAuth(
					`${baseUrl}/catalog/track/favorite/all/`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${access}`,
						},
					},
					refresh,
				)
				const respData = await resp.json()

				if (!resp.ok) {
					throw new Error(respData.message)
				}

				return respData.data
			} catch (err) {
				const error = err as Error
				console.error(error.message)
				throw new Error(error.message)
			}
		},
	),

	addFavoriteTrack: async ({
		trackId,
		access,
		refresh,
	}: {
		trackId: number
		access: string
		refresh: string
	}) => {
		try {
			const resp = await fetchWithAuth(
				`${baseUrl}/catalog/track/${trackId}/favorite/`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${access}`,
					},
				},
				refresh,
			)
			const respData = await resp.json()

			if (!resp.ok) {
				throw new Error(respData.message)
			}

			return respData.data
		} catch (err) {
			const error = err as Error
			console.error(error.message)
			throw new Error(error.message)
		}
	},

	deleteFavoriteTrack: async ({
		trackId,
		access,
		refresh,
	}: {
		trackId: number
		access: string
		refresh: string
	}) => {
		try {
			const resp = await fetchWithAuth(
				`${baseUrl}/catalog/track/${trackId}/favorite/`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${access}`,
					},
				},
				refresh,
			)
			const respData = await resp.json()

			if (!resp.ok) {
				throw new Error(respData.message)
			}

			return respData.data
		} catch (err) {
			const error = err as Error
			console.error(error.message)
			throw new Error(error.message)
		}
	},

	getSelections: createAsyncThunk(
		'tracks/getSelections',
		async (id: string) => {
			try {
				const resp = await fetch(`${baseUrl}/catalog/selection/${id}/`, {
					method: 'GET',
				})
				const respData = await resp.json()

				if (!resp.ok) {
					throw new Error(respData.message)
				}

				return respData.data
			} catch (err) {
				const error = err as Error
				console.error(error.message)
				throw new Error(error.message)
			}
		},
	),
}
