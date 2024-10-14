'use client'

import { userApi } from '@/api/userApi'
import { routes } from '@/lib/routes'
import { useAppDispatch } from '@/store/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, memo, useState } from 'react'
import ErrorMsg from '../Error/ErrorMsg/ErrorMsg'
import styles from './Register.module.css'
import Link from 'next/link'

export default memo(function Register() {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const [error, setError] = useState<string | null>(null)
	const [regData, setRegData] = useState({
		email: '',
		password: '',
		username: '',
	})

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setRegData({ ...regData, [name]: value })
		setError(null)
	}

	const signUp = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
			if (!regData.email.trim() && !regData.password.trim()) {
				setError('Заполните все поля')
				return
			} else if (!regData.email.trim()) {
				setError('Введите почту')
				return
			} else if (!regData.password.trim()) {
				setError('Введите пароль')
				return
			} else if (regData.password.length < 6) {
				setError('Пароль должен содержать не менее 6 символов.')
				return
			} else if (!regData.username.trim()) {
				setError('Введите имя пользователя')
				return
			} else if (regData.username.length < 3) {
				setError('Имя пользователя должно содержать не менее 3 символов.')
				return
			}

			try {
				await dispatch(userApi.regUser(regData)).unwrap()
				router.push(routes.LOGIN)
			} catch (err) {
				const error = err as Error
				setError(error.message)
				console.error(error.message)
			}
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.container_signup}>
				<div className={styles.modal__block}>
					<form onSubmit={signUp} className={styles.modal__form_login}>
						<Link href={routes.LOGIN}>
							<div className={styles.modal__logo}>
								<Image
									src='/img/logo_modal.png'
									alt='logo'
									width={140}
									height={21}
								/>
							</div>
						</Link>
						<input
							className={styles.modal__input}
							type='email'
							name='email'
							placeholder='Почта'
							value={regData.email}
							onChange={onChange}
						/>
						<input
							className={styles.modal__input}
							type='password'
							name='password'
							placeholder='Пароль'
							value={regData.password}
							onChange={onChange}
						/>
						<input
							className={styles.modal__input}
							type='text'
							name='username'
							placeholder='Имя пользователя'
							value={regData.username}
							onChange={onChange}
						/>
						{error && <ErrorMsg error={error} />}

						<button className={styles.modal__btn_signup_ent}>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
		</div>
	)
})
