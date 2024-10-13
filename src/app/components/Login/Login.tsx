import React, { useState } from 'react'
import styles from './Login.module.css'
import { useDispatch } from 'react-redux'
import { getTokenThunk, loginThunk } from 'store/userSlice'
import { AppDispatch } from 'store/store'
import Image from 'next/image'


export default function Login({open, setOpen} : {open: boolean, setOpen: (v: boolean) => void}) {
    const [values, setValues] = useState({password: '', email: ''})
    const dispatch = useDispatch<AppDispatch>()

    async function handleSubmit (e : any) {
        e.preventDefault()
        const [userRes, tokenRes] : any[] = await Promise.all([dispatch(loginThunk(values)), dispatch(getTokenThunk(values))])
        if(tokenRes.payload && userRes.payload) {
            setOpen(false)
        }
    }

    function handleInput (e : any) {
        setValues({...values, [e.target.name] : e.target.value})
    }

  return (
    <div className={`${styles.overlay} ${open && styles.open}`}>
        <div className={styles.container_enter}>
            <div className={styles.modal__block}>
                <form onSubmit={handleSubmit} className={styles.modal__form_login} action='#'>
                    <div className={styles.modal__logo}>
                        <Image
                            src='/img/logo_modal.png'
                            alt='logo'
                            width={140}
                            height={21}
                        />
                    </div>
          
                    <input
                        className={`${styles.modal__input} ${open && styles.login}`}
                        type='email'
                        name='email'
                        placeholder='Почта'
                        value={values.email}
                        onChange={handleInput}
                       
                    />
                    <input
                        className={styles.modal__input}
                        type='password'
                        name='password'
                        placeholder='Пароль'
                        value={values.password}
                        onChange={handleInput}
                        autoComplete='off'
                    />
                    <button className={styles.modal__btn_enter}>
                        Войти
                    </button>
                    <button className={styles.modal__btn_signup}>
                    </button>
                    <button onClick={() => setOpen(false)}>close</button>
                </form>
            </div>
        </div>
    </div>
  )
}
