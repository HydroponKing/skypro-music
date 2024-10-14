import { useTracksFilter } from '@/hooks/useTracksFilter'
import Search from '../../Search/Search'
import PlaylistItem from '../PlaylistItem/PlaylistItem'
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle'
import styles from './Playlist.module.css'
import { TrackDataType } from '@/lib/types'
import { useAppSelector } from '@/store/store'
import SkeletonLoader from '@/components/Skeleton/Skeleton'

type Props = {
	playlist: TrackDataType[]
	title: string
}

export default function Playlist({ playlist, title }: Props) {
	const { isLoading } = useAppSelector(state => state.playlist)
	const tracks = useTracksFilter(playlist)
	console.log(tracks);
	

	return (
		<div className={styles.main__centerblock}>
			<Search />
			<h2 className={styles.centerblock__h2}>
				{isLoading ? (
					<SkeletonLoader width={1107} height={72} borderRadius={0} />
				) : (
					title
				)}
			</h2>

			<div className={styles.centerblock__content}>
				<PlaylistTitle />
				<PlaylistItem playlist={tracks} />
			</div>
		</div>
	)
}
