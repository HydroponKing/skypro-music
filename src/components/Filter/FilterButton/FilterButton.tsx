'use client'

import React, { useState } from 'react'
import styles from './FilterButton.module.css'
import classNames from 'classnames'
import FilterList from '../FilterList/FilterList'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useAppSelector } from '@/store/store'

type Props = {
	title: string
	getFilterLists: string[]
}

export default function FilterButton({ title, getFilterLists }: Props) {
	const { visible, setVisible, ref } = useOutsideClick(false)
	const [openFilter, setOpenFilter] = useState<string | null>(null)
	const { filterOptions } = useAppSelector(state => state.playlist)

	const filterOptionsCounter =
		title === 'исполнителю'
			? filterOptions.author.length
			: title === 'жанру'
				? filterOptions.genre.length
				: 0

	const handleOpenFilter = (title: string) => {
		if (openFilter === title) {
			setOpenFilter(null)
		} else {
			setOpenFilter(title)
		}
		setVisible(prev => !prev)
	}

	return (
		<div className={styles.filterWrapper} ref={ref}>
			<div
				className={classNames(styles.filter__button, {
					[styles._btn_active]: visible,
				})}
				onClick={() => handleOpenFilter(title)}
			>
				{title}
			</div>

			{filterOptionsCounter > 0 && (
				<div className={styles.filter__counter}>{filterOptionsCounter}</div>
			)}

			{visible && <FilterList options={getFilterLists} title={title} />}
		</div>
	)
}
