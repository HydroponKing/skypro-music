import React from 'react'
import styles from './NotFound.module.css'
import Link from 'next/link'
import { routes } from '@/lib/routes'

export default function NotFound() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.notFound}>
					<h1 className={styles.notFound__title}>404</h1>
					<h2 className={styles.notFound__subtitle}>Страница не найдена</h2>
					<p className={styles.notFound__description}>
						Возможно, она была удалена или перенесена на другой адрес
					</p>
					<button className={styles.notFound__returnBtn}>
						<Link href={routes.HOME}> Вернуться на главную</Link>
					</button>
				</div>
			</div>
		</div>
	)
}
