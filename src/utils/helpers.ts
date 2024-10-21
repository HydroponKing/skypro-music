import { userApi } from '@/api/userApi'
import { format } from 'date-fns'

export const trackFormattedTime = (time: number) => format(time * 1000, 'm:ss')

export const handleVolumeProgress = (el: HTMLInputElement | null) => {
	if (el) {
		el.style.setProperty('--value', el.value)
		el.style.setProperty('--min', el.min === '' ? '0' : el.min)
		el.style.setProperty('--max', el.max === '' ? '1' : el.max)
		el.addEventListener('input', () =>
			el.style.setProperty('--value', el.value),
		)
	}
}

export const apiErrorHandler = (error: number) => {
	switch (error) {
		case 400:
			throw new Error('Запрос составлен некорректно')
		case 401:
			throw new Error('Пользователь с таким email или паролем не найден.')
		case 403:
			throw new Error('Введенный Email уже занят.')
		case 412:
			throw new Error('Данные в неверном формате.')
		case 500:
			throw new Error('Сервер сломался')
		default:
			throw new Error('Неизвестная ошибка')
	}
}

export const getUserFromLs = () => {
	try {
		const user = localStorage.getItem('user')
		return user && JSON.parse(user)
	} catch (err) {
		const error = err as Error
		console.error(error.message)
		return null
	}
}

export const getTokensFromLs = () => {
	try {
		const tokens = localStorage.getItem('tokens')
		return tokens && JSON.parse(tokens)
	} catch (err) {
		const error = err as Error
		console.error(error.message)
		return null
	}
}

export const fetchWithAuth = async (
	url: string,
	options: RequestInit,
	refresh: string,
) => {
	let resp = await fetch(url, options)

	if (resp.status === 401) {
		const newAccessToken = await userApi.refreshToken(refresh)
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${newAccessToken}`,
		}
		resp = await fetch(url, options)
	}

	if (!resp.ok) {
		throw new Error(resp.statusText)
	}

	return resp
}
