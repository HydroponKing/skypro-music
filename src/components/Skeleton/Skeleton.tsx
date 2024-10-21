import React, { CSSProperties, memo } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type Props = {
	count?: number
	width: number
	height: number
	borderRadius?: number
	style?: CSSProperties
}

export default memo(function SkeletonLoader({
	count,
	width,
	height,
	borderRadius,
	style,
}: Props) {
	return (
		<SkeletonTheme baseColor='#313131' highlightColor='#ad61ff'>
			<Skeleton
				count={count}
				width={width}
				height={height}
				borderRadius={borderRadius}
				style={style}
			/>
		</SkeletonTheme>
	)
})
