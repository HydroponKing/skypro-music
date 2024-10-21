import React, { ChangeEvent } from 'react'
import styles from './Search.module.css'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setSearchValue } from '@/store/features/playlistSlice'


export default function Search() {

	const dispatch = useAppDispatch()
	const { filterOptions } = useAppSelector(state => state.playlist)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchValue(event.target.value))
	}


	return (
		<div className={styles.centerblock__search}>
			<svg className={styles.search__svg}>
				<use xlinkHref='/img/icon/sprite.svg#icon-search' />
			</svg>
			<input
				className={styles.search__text}
				type='search'
				placeholder='Поиск'
				name='search'
				value={filterOptions.searchValue}
				onChange={handleSearch}
			/>
		</div>
	)
}
