import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/registration/LoginPage';
import { UserContext } from './hooks/UserContext';
import { SignupPage } from './pages/registration/SignupPage';

const App = () => {
	const { user } = useContext(UserContext);

	return (
		<Router>
			{!user && (
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/signup">
						<SignupPage />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
			)}
			<Switch>
				<Route path="/feed"></Route>
			</Switch>
		</Router>
	);
};

export default App;
