import React from 'react'
import styles from './Error.module.css'

export default function Error({ onClick }: { onClick: () => void }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.error}>
					<h2 className={styles.error__title}>Ошибка загрузки</h2>
					<p className={styles.error__subtitle}>
						Проверьте подключение к сети и повторите попытку
					</p>
					<button className={styles.error__retryBtn} onClick={onClick}>
						Повторить
					</button>
				</div>
			</div>
		</div>
	)
}
