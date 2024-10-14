import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/store/ReduxProvider'

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
	title: 'skypro-music',
	description: 'Music for soul',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<ReduxProvider>
				<body className={montserrat.className}>{children}</body>
			</ReduxProvider>
		</html>
	)
}
