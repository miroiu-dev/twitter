import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/registration/LoginPage';
import { UserContext } from './hooks/UserContext';
import { SignupPage } from './pages/registration/SignupPage';
import axios from 'axios';

const Feed: React.FC = () => {
	return <div></div>;
};

// const useScreenType = () =>{
// 	const is3Cols = useMediaQuery({minWidth:1440});
// 	const is2Cols = useMediaQuery({minWidth:1265});
// 	const is1Cols = useMediaQuery({minWidth:800});
// }

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
				<Route path="/feed">
					{/* <button
						onClick={() => {
							axios.post('http://localhost:3001/logout');
						}}
					>
						Logout
					</button> */}
					<Feed></Feed>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
