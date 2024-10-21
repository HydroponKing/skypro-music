import Track from '@/components/Track/Track'
import { TrackDataType } from '@/lib/types'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useLikeTrack } from '@/hooks/useLikeTrack'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import { cleanup } from '@testing-library/react'

jest.mock('../store/store.ts')
jest.mock('../hooks/useLikeTrack.ts')

const mockDispatch = useAppDispatch as jest.Mock
const mockSelector = useAppSelector as jest.Mock
const mockLike = useLikeTrack as jest.Mock

describe('Плейлист', () => {
	beforeEach(() => {
		mockDispatch.mockReturnValue(jest.fn())
		mockSelector.mockReturnValue(jest.fn())
		mockLike.mockReturnValue(jest.fn())
	})
	afterEach(() => {
		cleanup()
	})

	const trackListTests: TrackDataType[] = [
		{
			_id: 1,
			name: 'test 1',
			author: 'test 1',
			album: 'test 1',
			duration_in_seconds: 100,
			track_file: '',
			release_date: '2021-01-01',
			genre: [],
			logo: { type: '', data: [] },
			staredUser: [],
		},
		{
			_id: 2,
			name: 'test 2',
			author: 'test 2',
			album: 'test 2',
			duration_in_seconds: 200,
			track_file: '',
			release_date: '2022-02-02',
			genre: [],
			logo: { type: '', data: [] },
			staredUser: [],
		},
		{
			_id: 3,
			name: 'test 3',
			author: 'test 3',
			album: 'test 3',
			duration_in_seconds: 300,
			track_file: '',
			release_date: '2023-03-03',
			genre: [],
			logo: { type: '', data: [] },
			staredUser: [],
		},
	]

	trackListTests.forEach(track => {
		it('рендер списка треков', () => {
			const tracks = renderer
				.create(<Track key={track._id} {...track} />)
				.toJSON()
			expect(tracks).toMatchSnapshot()
		})
	})
})