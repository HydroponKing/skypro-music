import React, { useState } from 'react'
import styles from './Registry.module.css'
import { useDispatch } from 'react-redux'
import { registryThunk } from 'store/userSlice'
import { AppDispatch } from 'store/store'

export default function Registry({open, setOpen} : {open: boolean, setOpen: (v: boolean) => void}) {
    const [values, setValues] = useState({login: '', password: ''})
    const dispatch = useDispatch<AppDispatch>()

    async function handleSubmit (e : any) {
        e.preventDefault()
        const res = await dispatch(registryThunk(values))
        console.log(res);
    }

    function handleInput (e : any) {
        setValues({...values, [e.target.name] : e.target.value})
    }

  return (
    <div className={`${styles.overlay} ${open && styles.open}`}>
        <form onSubmit={handleSubmit}>
            <input type="text" onInput={handleInput} name='login' value={values.login}/>
            <input type="text" onInput={handleInput} name='password' value={values.password}/>
            <button>Registry</button>
            <button onClick={() => setOpen(false)}>close</button>
        </form>
    </div>
  )
}
