'use client'

import Bar from '@/components/Bar/BarMain/Bar'
import Nav from '@/components/Nav/Nav'
import Sidebar from '@/components/Sidebar/SideBarMain/Sidebar'
import { useAppSelector } from '@/store/store'
import styles from '../../components/Main/Main.module.css'
import React from 'react'

export default function TrackLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { currTrack } = useAppSelector(state => state.playlist)

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<main className={styles.main}>
					<Nav />
					{children}
					<Sidebar />
				</main>
				{currTrack && <Bar />}
			</div>
		</div>
	)
}
