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
import default_profile_normal from './components/images/default_profile_normal.png';
import { SidebarLink } from './components/sidebar/SidebarLink';
import {
	BookmarksFilledSVG,
	BookmarksSVG,
	HashtagFilledSVG,
	HashtagSVG,
	HouseFilledSVG,
	ListsFilledSVG,
	ListsSVG,
	MessagesFilledSVG,
	MessagesSVG,
	MoreSVG,
	NotificationsFilledSVG,
	NotificationsSVG,
	ProfileFilledSVG,
	ProfileSVG,
	HouseSVG,
} from './components/sidebar/Atoms';
import { TweetButton } from './components/buttons/TweetButton';
import { UserOptionsModal } from './components/modals/UserOptions';

const LeftPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
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

const LayoutWrapper = styled.div`
	display: flex;
`;

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
			<LayoutWrapper>
				<LeftPanel>{leftPanel}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</LayoutWrapper>
		);
	} else if (screenType === '2-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</LayoutWrapper>
		);
	} else if (screenType === '1-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
			</LayoutWrapper>
		);
	} else if (screenType === 'fullscreen') {
		middle = <LayoutWrapper>{children}</LayoutWrapper>;
	}

	return middle;
};

const TabletSidebarWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const NavigationWrapper = styled.div``;

const TweetButtonWrapper = styled.div`
	padding: 0.3rem 0;
	display: flex;
	justify-content: center;
`;

const ContainerWrapper = styled.div`
	padding: 0.75rem;
	border-radius: 50%;

	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
`;

const ProfilePictureWrapper = styled.div`
	position: relative;
	margin: 0.75rem 0;
`;

const ProfileWrapper = styled.div`
	display: flex;
`;

const ProfilePicture = styled.img`
	border-radius: 9999px;
	height: 40px;
	width: 40px;
`;

const TabletSidebar: React.FC = () => {
	return (
		<TabletSidebarWrapper>
			<NavigationWrapper>
				<SidebarLink
					path="/home"
					icon={HouseSVG}
					iconFilled={HouseFilledSVG}
				/>
				<SidebarLink
					path="/explore"
					icon={HashtagSVG}
					iconFilled={HashtagFilledSVG}
				/>
				<SidebarLink
					path="/notifications"
					icon={NotificationsSVG}
					iconFilled={NotificationsFilledSVG}
				/>
				<SidebarLink
					path="/messages"
					icon={MessagesSVG}
					iconFilled={MessagesFilledSVG}
				/>
				<SidebarLink
					path="/bookmarks"
					icon={BookmarksSVG}
					iconFilled={BookmarksFilledSVG}
				/>
				<SidebarLink
					path="/lists"
					icon={ListsSVG}
					iconFilled={ListsFilledSVG}
				/>
				<SidebarLink
					path="/profile"
					icon={ProfileSVG}
					iconFilled={ProfileFilledSVG}
				/>
				<SidebarLink path="/more" icon={MoreSVG} iconFilled={MoreSVG} />
				<TweetButtonWrapper>
					<TweetButton></TweetButton>
				</TweetButtonWrapper>
			</NavigationWrapper>
			<ProfilePictureWrapper>
				<ContainerWrapper>
					<ProfileWrapper>
						<ProfilePicture src={default_profile_normal} />
					</ProfileWrapper>
				</ContainerWrapper>
				<UserOptionsModal
					show={false}
					arrowLeft="9%"
					arrowTop="100%"
					modalLeft="60px"
					modalBottom="60px"
				></UserOptionsModal>
			</ProfilePictureWrapper>
		</TabletSidebarWrapper>
	);
};

const HomeLayout = styled.div`
	max-width: 600px;
	width: 100%;
`;

const App = () => {
	const { user } = useAuth();

	return (
		<Router>
			{user ? (
				<Layout
					leftPanel={<Sidebar />}
					tabletSidebar={<TabletSidebar />}
				>
					<Switch>
						<Route path="/home">
							<HomeLayout />
						</Route>
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
