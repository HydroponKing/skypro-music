import { useEffect, useRef, useState } from 'react'

export const useOutsideClick = (initValue: boolean) => {
	const ref = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(initValue)

	const handleClickOutside = (event: Event) => {
		const target = event.target as HTMLDivElement
		if (ref.current && !ref.current.contains(target)) {
			setVisible(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [ref])

	return { visible, setVisible, ref }
}
