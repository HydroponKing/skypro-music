import styles from './Sidebar.module.css'
import Image from 'next/image'
import SidebarPersonal from '../SidebarPersonal/SidebarPersonal'
import Link from 'next/link'
import { selectionsList } from '@/lib/data'
import { useAppDispatch, useAppSelector } from '@/store/store'
import SkeletonLoader from '@/components/Skeleton/Skeleton'
import { resetFilterOptions } from '@/store/features/playlistSlice'
import { useMemo } from 'react'

export default function Sidebar() {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.playlist)

	return (
		<div className={styles.main__sidebar}>
			<SidebarPersonal />
			<div className={styles.sidebar__block}>
				<div className={styles.sidebar__list}>
					{useMemo(() => isLoading ? (
							<SkeletonLoader
								count={3}
								width={250}
								height={150}
								borderRadius={0}
								style={{ marginBottom: '30px' }}
							/>
						) : (
							selectionsList.map(selection => (
								<div className={styles.sidebar__item} key={selection.id}>
									<Link
										className={styles.sidebar__link}
										href={selection.href + selection.id}
									>
										<Image
											className={styles.sidebar__img}
											src={selection.src}
											alt={selection.alt}
											width={250}
											height={150}
											priority
											onClick={() => dispatch(resetFilterOptions())}
										/>
									</Link>
								</div>
							))
						) , [isLoading])
					}
				</div>
			</div>
		</div>
	)
}
