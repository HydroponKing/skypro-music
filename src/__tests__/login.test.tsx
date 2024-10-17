import Login from '@/components/Login/Login'
import { useAppDispatch } from '@/store/store'
import { useRouter } from 'next/navigation'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'

jest.mock('../store/store.ts')
jest.mock('next/navigation')

const mockDispatch = useAppDispatch as jest.Mock  
const mockRouter = useRouter as jest.Mock

describe('Страница авторизации', () => {
	beforeEach(() => {
		mockDispatch.mockReturnValue(jest.fn())
		mockRouter.mockReturnValue(jest.fn())
	})

	describe('Рендер элементов на странице', () => {
		it('рендер компонента', () => {
			const login = renderer.create(<Login />).toJSON()
			expect(login).toMatchSnapshot()
		})
		it('лого приложения', () => {
			render(<Login />)

			const logoImg = screen.getByRole('img', { name: 'logo' })

			expect(logoImg).toBeInTheDocument()
		})
		it('поле ввода', () => {
			render(<Login />)

			const input = screen.getByRole('textbox')
			const emailInput = screen.getByPlaceholderText('Почта')
			const passInput = screen.getByPlaceholderText('Пароль')

			expect(input).toBeInTheDocument()
			expect(emailInput).toBeInTheDocument()
			expect(passInput).toBeInTheDocument()
		})
		it('кнопка авторизации и перехода к регистрации', () => {
			render(<Login />)

			const enterBtn = screen.getByRole('button', { name: 'Войти' })
			const regBtn = screen.getByRole('button', { name: 'Зарегистрироваться' })

			expect(enterBtn).toBeInTheDocument()
			expect(regBtn).toBeInTheDocument()
		})
	})

	describe('Валидация полей ввода', () => {
		it('должен выводить сообщение, если все поля ввода пустые', () => {
			render(<Login />)

			const enterBtn = screen.getByText('Войти')

			fireEvent.click(enterBtn)
			expect(screen.getByText('Заполните все поля')).toBeInTheDocument()
		})
		it('должен выводить сообщение, если пароль содержит менее 6 символов', () => {
			render(<Login />)

			const enterBtn = screen.getByText('Войти')
			const emailInput = screen.getByPlaceholderText('Почта')
			const passwordInput = screen.getByPlaceholderText('Пароль')

			fireEvent.change(emailInput, {
				target: {
					value: 'test@mail.com',
				},
			})
			fireEvent.change(passwordInput, {
				target: {
					value: '123',
				},
			})

			fireEvent.click(enterBtn)
			expect(
				screen.getByText('Пароль должен содержать не менее 6 символов.'),
			).toBeInTheDocument()
		})
	})
})