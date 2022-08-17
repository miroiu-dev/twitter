import { Navigate, Route, Routes } from 'react-router-dom';
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

const ProtectedApp = () => {
	const { user } = useAuth();

	return (
		<>
			{user ? (
				<Layout
					rightPanel={<SidePanel />}
					leftPanel={<Sidebar />}
					tabletSidebar={<TabletSidebar />}
				>
					<Routes>
						<Route path="/" element={<Home />} />

						<Route
							path="/explore"
							element={<UnimplementedRoute />}
						/>
						<Route
							path="/notifications"
							element={<UnimplementedRoute />}
						/>
						<Route
							path="/messages"
							element={<UnimplementedRoute />}
						/>
						<Route
							path="/bookmarks"
							element={<UnimplementedRoute />}
						/>
						<Route path="/lists" element={<UnimplementedRoute />} />
						<Route
							path="/profile"
							element={<UnimplementedRoute />}
						/>
						<Route path="/more" element={<UnimplementedRoute />} />
						<Route path="/tweet/:id" element={<FullTweet />} />

						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Layout>
			) : (
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/" element={<LandingPage />} />
				</Routes>
			)}
		</>
	);
};

const UnimplementedRoute = () => {
	return (
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
	);
};

const App = () => <ProtectedApp />;

export default App;
