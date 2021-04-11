import React, { ReactNode } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/registration/LoginPage';
import { SignupPage } from './pages/registration/SignupPage';
import { useScreenType } from './hooks/useScreenType';
import styled from '@emotion/styled/macro';
import { Sidebar } from './components/sidebar/Sidebar';
import { useAuth } from './hooks/useAuth';

const LeftPanel = styled.div`
	display: flex;
	flex-direction: column;
	width: 275px;
	//to be removed
	margin: 0 auto;
`;

const RightPanel = styled.div`
	display: flex;
	flex-direction: column;
	width: 275px;
`;

type LayoutProps = {
	leftPanel?: ReactNode;
	rightPanel?: ReactNode;
	tabletSidebar?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({
	children,
	leftPanel,
	rightPanel,
	tabletSidebar,
}) => {
	const screenType = useScreenType();
	let middle = null;

	if (screenType === '3-cols') {
		middle = (
			<>
				<LeftPanel>{leftPanel}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</>
		);
	} else if (screenType === '2-cols') {
		middle = (
			<>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</>
		);
	} else if (screenType === '1-cols') {
		middle = (
			<>
				<LeftPanel>{tabletSidebar}</LeftPanel>

				<RightPanel>{rightPanel}</RightPanel>
			</>
		);
	} else if (screenType === 'fullscreen') {
		middle = <>{children}</>;
	}

	return <>{middle}</>;
};

const App = () => {
	const { user } = useAuth();

	return (
		<Router>
			{user ? (
				<Layout leftPanel={<Sidebar />}>
					<Switch>
						<Route path="/home"></Route>
						<Route path="/explore"></Route>
						<Route path="/notifications"></Route>
						<Route path="/messages"></Route>
						<Route path="/bookmarks"></Route>
						<Route path="/lists"></Route>
						<Route path="/profile"></Route>
						<Route path="/more"></Route>
						<Route path="/">
							<Redirect to="/home" />
						</Route>
					</Switch>
				</Layout>
			) : (
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
		</Router>
	);
};

export default App;
