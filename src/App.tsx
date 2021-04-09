import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/registration/LoginPage';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/signup"></Route>
				<Route path="/">
					<LandingPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
