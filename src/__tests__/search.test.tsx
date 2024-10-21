import Progress from '@/components/Bar/Progress/Progress'
import renderer from 'react-test-renderer'

describe('Индикатор прогресса', () => {
	it('рендер прогресс бара', () => {
		const props = {
			max: 100,
			value: 10,
			step: 0.5,
			onChange: () => {},
		}

		const bar = renderer
			.create(
				<Progress
					max={props.max}
					value={props.value}
					step={props.step}
					onChange={props.onChange}
				/>,
			)
			.toJSON()
		expect(bar).toMatchSnapshot()
	})
})