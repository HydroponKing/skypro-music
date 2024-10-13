import React, { use, useState } from 'react'
import styles from './Registry.module.css'
import { useDispatch } from 'react-redux'
import { registryThunk } from 'store/userSlice'
import { AppDispatch } from 'store/store'
import Image from 'next/image'
import { useRef } from 'react'

export default function Registry({open, setOpen} : {open: boolean, setOpen: (v: boolean) => void}) {
    const [values, setValues] = useState({username: '', password: '', email: ''})
    const dispatch = useDispatch<AppDispatch>()
	const ref = useRef(null)

    async function handleSubmit (e : any) {
        e.preventDefault()
        const res = await dispatch(registryThunk(values))
        if(res.payload){
			setOpen(false)
		}
    }

    function handleInput (e : any) {
        setValues({...values, [e.target.name] : e.target.value})
    }

	function closeOverlay (e : any) {
		if(e.target === ref.current){
			setOpen(false)
		}
	}

  return (
<div ref={ref} onClick={closeOverlay} className={`${styles.overlay} ${open && styles.open}`}>
			<div className={styles.container_signup}>
				<div className={styles.modal__block}>
					<form onSubmit={handleSubmit} className={`${styles.modal__form_login}`}>
						<div className={styles.modal__logo}>
							<Image
								src='/img/logo_modal.png'
								alt='logo'
								width={140}
								height={21}
							/>
						</div>
						<input
							className={styles.modal__input}
							type='email'
							name='email'
							placeholder='Почта'
							value={values.email}
							onChange={handleInput}
						/>
						<input
							className={styles.modal__input}
							type='username'
							name='username'
							placeholder='username'
							value={values.username}
							onChange={handleInput}
						/>
						<input
							className={styles.modal__input}
							type='password'
							name='password'
							placeholder='Пароль'
							value={values.password}
							onChange={handleInput}
						/>
						<input
							className={styles.modal__input}
							type='password'
							name='password'
							placeholder='Повторите пароль'
							value={values.password}
							onChange={handleInput}
						/>

						<button className={styles.modal__btn_signup_ent}>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
            </div>
  )
}
