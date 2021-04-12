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
const LeftPanel = styled.div<{ width?: string }>`
	display: flex;
	flex-direction: column;

	width: ${props => props.width ?? '275px'};
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
				<LeftPanel width="52px">{tabletSidebar}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</>
		);
	} else if (screenType === '1-cols') {
		middle = (
			<>
				<LeftPanel width="52px">{tabletSidebar}</LeftPanel>

				<RightPanel>{rightPanel}</RightPanel>
			</>
		);
	} else if (screenType === 'fullscreen') {
		middle = <>{children}</>;
	}

	return <>{middle}</>;
};

const TabletSidebarWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const NavigationWrapper = styled.div``;

const TweetButtonWrapper = styled.div`
	padding: 0.3rem 0;
	display: flex;
	justify-content: center;
`;

const ContainerWrapper = styled.div`
	margin: 0.75rem 0;
`;

const Container = styled.div`
	position: relative;
`;

const ProfilePictureWrapper = styled.div`
	border-radius: 9999px;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
	margin: 0.75rem 0;
`;

const ProfileWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const ProfilePicture = styled.img`
	border-radius: 9999px;
	height: 2em;
	width: 2em;
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
			</ProfilePictureWrapper>
			<UserOptionsModal
				show={false}
				arrowLeft="9%"
				arrowTop="100%"
				modalLeft="60px"
				modalBottom="60px"
			></UserOptionsModal>
		</TabletSidebarWrapper>
	);
};

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
