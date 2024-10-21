import { TrackDataType } from '@/lib/types'
import { useAppSelector } from '@/store/store'
import Track from '@/components/Track/Track'
import styles from './PlaylistItem.module.css'
import SkeletonLoader from '@/components/Skeleton/Skeleton'
import { useMemo } from 'react'

type Props = {
	playlist: TrackDataType[]
}

export default function PlaylistItem({ playlist }: Props) {
	const { isLoading } = useAppSelector(state => state.playlist)
	const infoMsg = !isLoading && !playlist.length && 'Треки не найдены'
	

	return (
		<div className={styles.content__playlist}>
			{infoMsg}
			{useMemo(() => isLoading ? 
					<SkeletonLoader
						count={7}
						width={1107}
						height={51}
						borderRadius={0}
						style={{ marginBottom: '12px' }}
					/>
				: 
						playlist.map((track: TrackDataType) => (
						<Track key={track._id} {...track} />
					)), 
			[playlist, isLoading])}
		</div>
	)
}
