import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './features/userSlice'
import { playlistReducer } from './features/playlistSlice'

export const makeStore = () => {
	return configureStore({
		reducer: combineReducers({
			user: userReducer,
			playlist: playlistReducer,
		}),
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
