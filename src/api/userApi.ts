import { SignInDataType, SignUpDataType } from '@/lib/types'
import { apiErrorHandler } from '@/utils/helpers'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseHost = 'https://webdev-music-003b5b991590.herokuapp.com/user/'

export const userApi = {
	getUser: createAsyncThunk(
		'user/getUser',
		async ({ email, password }: SignInDataType) => {
			const resp = await fetch(`${baseHost}login/`, {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'content-type': 'application/json' },
			})

			if (!resp.ok) {
				apiErrorHandler(resp.status)
			}

			const json = await resp.json()
			return json
		},
	),

	regUser: createAsyncThunk(
		'user/regUser',
		async ({ email, password, username }: SignUpDataType) => {
			const resp = await fetch(`${baseHost}signup/`, {
				method: 'POST',
				body: JSON.stringify({ email, password, username }),
				headers: { 'content-type': 'application/json' },
			})

			if (!resp.ok) {
				apiErrorHandler(resp.status)
			}

			const json = await resp.json()
			return json
		},
	),

	getToken: createAsyncThunk(
		'user/getToken',
		async ({ email, password }: SignInDataType) => {
			const resp = await fetch(`${baseHost}token/`, {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'content-type': 'application/json' },
			})

			if (!resp.ok) {
				apiErrorHandler(resp.status)
			}

			const json = await resp.json()
			return json
		},
	),

	refreshToken: async (refresh: string) => {
		const resp = await fetch(`${baseHost}token/refresh/`, {
			method: 'POST',
			body: JSON.stringify({ refresh }),
			headers: { 'content-type': 'application/json' },
		})

		if (!resp.ok) {
			apiErrorHandler(resp.status)
		}

		const json = await resp.json()
		return json.access
	},
}
