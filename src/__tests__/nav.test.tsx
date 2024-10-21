import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react'
import Nav from '@/components/Nav/Nav'
import { useAppDispatch, useAppSelector } from '@/store/store'

jest.mock('../store/store.ts')

const mockUseAppDispatch = useAppDispatch as jest.Mock
const mockUseAppSelector = useAppSelector as jest.Mock
const mockDispatch = jest.fn()

describe('Меню навигации', () => {
	beforeEach(() => {
		mockUseAppDispatch.mockReturnValue(mockDispatch)
		mockUseAppSelector.mockReturnValue(mockDispatch)
	})
	afterEach(() => jest.clearAllMocks())

	it('рендер компонента', () => {
		const nav = renderer.create(<Nav />).toJSON()
		expect(nav).toMatchSnapshot()
	})
	it('отображение списка меню при клике', () => {
		render(<Nav />)
		const burger = screen.getByTestId('burgerBtn')

		fireEvent.click(burger)
		const mainLink = screen.getByText('Главное')
		const authLink = screen.getByText('Войти')

		expect(mainLink).toBeInTheDocument()
		expect(authLink).toBeInTheDocument()
	})
})