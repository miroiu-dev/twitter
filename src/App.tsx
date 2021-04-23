import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/registration/LoginPage';
import { SignupPage } from './pages/registration/SignupPage';
import { Sidebar } from './components/sidebar/Sidebar';
import { useAuth } from './hooks/useAuth';
import { TabletSidebar } from './components/tablet-sidebar/TabletSidebar';
import { Home } from './pages/home/Home';
import { SidePanel } from './components/side-panel/SidePanel';
import { Layout } from './pages/universal/Layout';
import { FullTweet } from './pages/home/FullTweet/FullTweet';
import { LoaderWrapper } from './pages/home/Feed';
import { HomeLayout as MainLayout } from './pages/home/Home';
import Loader from 'react-loader-spinner';

const App = () => {
	const { user } = useAuth();

	return (
		<Router>
			{user ? (
				<Layout
					rightPanel={<SidePanel />}
					leftPanel={<Sidebar />}
					tabletSidebar={<TabletSidebar />}
				>
					<Switch>
						<Route path="/home">
							<Home />
						</Route>
						<Route path="/explore">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/notifications">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/messages">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/bookmarks">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/lists">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/profile">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/more">
							<MainLayout>
								<LoaderWrapper>
									<Loader
										type="Oval"
										color="rgb(29, 161, 242)"
										height={30}
										width={30}
									/>
								</LoaderWrapper>
							</MainLayout>
						</Route>
						<Route path="/tweet/:id">
							<FullTweet />
						</Route>
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
