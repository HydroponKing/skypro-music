import {
	setAuthor,
	setGenre,
	setOrderData,
} from '@/store/features/playlistSlice'
import React, { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import classNames from 'classnames'
import styles from './FilterList.module.css'

type Props = {
	options: string[]
	title: string
}

export default function FilterList({ options, title }: Props) {
	const dispatch = useAppDispatch()
	const { filterOptions } = useAppSelector(state => state.playlist)

	const activeOptions = useCallback(
		(selectedValue: string) => {
			return (
				filterOptions.author.includes(selectedValue) ||
				filterOptions.orderData.includes(selectedValue) ||
				filterOptions.genre.includes(selectedValue)
			)
		},
		[filterOptions.author, filterOptions.orderData, filterOptions.genre],
	)

	const getFilteredTracks = useCallback(
		(option: string) => {
			switch (title) {
				case 'исполнителю':
					dispatch(setAuthor(option))
					break
				case 'году выпуска':
					dispatch(setOrderData(option))
					break
				case 'жанру':
					dispatch(setGenre(option))
					break

				default:
					break
			}
		},
		[dispatch, title],
	)

	return (
		<div className={styles.filterList}>
			<ul className={styles.listItems}>
				{useMemo(() => {
					return options.map((option, key: number) => (
						<li
							key={key}
							className={classNames(styles.listItem, {
								[styles.activeListItem]: activeOptions(option),
							})}
							onClick={() => getFilteredTracks(option)}
						>
							{option}
						</li>
					))
				}, [options, getFilteredTracks, activeOptions])}
			</ul>
		</div>
	)
}
