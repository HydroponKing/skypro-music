'use client'

import React, { useEffect, useState } from 'react'
import styles from './SidebarPersonal.module.css'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { routes } from '@/lib/routes'
import { logout } from '@/store/features/userSlice'
import { useInitLikedTracks } from '@/hooks/useInitLikedTracks'
import { clearFavorite } from '@/store/features/playlistSlice'

export default function SidebarPersonal() {
	useInitLikedTracks()
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { user } = useAppSelector(state => state.user)

	const onLogout = () => {
		dispatch(logout())
		dispatch(clearFavorite())
		router.push(routes.HOME)
	}

	//Решение проблемы с гидратацией
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<div className={styles.sidebar__personal}>
			<p className={styles.sidebar__personal_name}>
				{isClient && user?.username}
			</p>

			{isClient && user && (
				<div className={styles.sidebar__icon} onClick={onLogout}>
					<svg>
						<use xlinkHref='/img/icon/sprite.svg#logout' />
					</svg>
				</div>
			)}
		</div>
	)
}
