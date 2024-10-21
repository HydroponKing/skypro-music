import React from 'react'
import styles from './ErrorMsg.module.css'

type ErrorMsgType = {
	error: string | null
}

export default function ErrorMsg({ error }: ErrorMsgType) {
	return (
		<>
			<p className={styles.errorMsg}>{error}</p>
		</>
	)
}
