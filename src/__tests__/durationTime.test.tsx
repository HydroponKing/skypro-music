import { trackFormattedTime } from '@/utils/helpers'

describe('Форматирование длительности времени трека по шаблону', () => {
	const timeFormatTests = [
		{
			in: 0,
			out: '0:00',
		},
		{
			in: 30,
			out: '0:30',
		},
		{
			in: 60,
			out: '1:00',
		},
		{
			in: 360,
			out: '6:00',
		},
	]

	timeFormatTests.forEach(time => {
		it(`если длительность ${time.in} секунд, ожидаем: ${time.out}`, () => {
			const times = trackFormattedTime(time.in)
			expect(times).toBe(time.out)
		})
	})
})