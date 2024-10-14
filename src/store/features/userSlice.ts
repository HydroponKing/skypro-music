import { userApi } from '@/api/userApi'
import { TokenType, UserDataType } from '@/lib/types'
import { getTokensFromLs, getUserFromLs } from '@/utils/helpers'
import { createSlice } from '@reduxjs/toolkit'

type UserStateType = {
	user: UserDataType | null
	tokens: TokenType | null
}

const initialState: UserStateType = {
	user: getUserFromLs(),
	tokens: getTokensFromLs(),
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.user = null
			localStorage.removeItem('user')
			localStorage.removeItem('tokens')
		},
	},

	extraReducers: builder => {
		builder
			.addCase(userApi.getUser.fulfilled, (state, action) => {
				state.user = action.payload
				localStorage.setItem('user', JSON.stringify(state.user))
			})
			.addCase(userApi.regUser.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(userApi.getToken.fulfilled, (state, action) => {
				state.tokens = action.payload
				localStorage.setItem('tokens', JSON.stringify(state.tokens))
			})
	},
})

export const { logout } = userSlice.actions
export const userReducer = userSlice.reducer
