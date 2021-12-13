import { FC } from 'react'
import { Check } from './pages/Check'
import { Switch, Route } from 'react-router-dom'
import { Instructions } from './pages/Instructions'

export const Routes: FC = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Check />
			</Route>
			<Route path='/instructions'>
				<Instructions />
			</Route>
		</Switch>
	)
}
