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
import { TabletSidebar } from './components/tablet-sidebar/TabletSidebar';

import { SidePanel } from './components/side-panel/SidePanel';
import { DotsSVG, IconWrapper } from './components/side-panel/Atoms';
import { Sparkles } from './components/icons/Sparkles';
import { Link } from 'react-router-dom';
import { CreateTweet } from './pages/home/CreateTweet';
import {
	Comment,
	Heart,
	Retweet,
	Share,
} from './components/icons/TweetInteraction';
import { GridColumn, GridRow } from './pages/home/Atoms';
const LeftPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const RightPanel = styled.div`
	display: flex;
	flex-direction: column;
`;

type LayoutProps = {
	leftPanel?: ReactNode;
	rightPanel?: ReactNode;
	tabletSidebar?: ReactNode;
};

const LayoutWrapper = styled.div`
	display: flex;
	justify-content: center;
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

const HomeLayout = styled.div`
	max-width: 600px;
	width: 100%;
	border-left: 1px solid rgb(47, 51, 54);
	border-right: 1px solid rgb(47, 51, 54);
`;

const Header = styled.div`
	height: 53px;
	padding: 0 1rem;
	background: #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
`;

const Icon = styled(Sparkles)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
`;

const Title = styled(Link)`
	font-weight: 800;
	font-size: 1.25rem;
	color: rgb(217, 217, 217);
	text-decoration: none;
`;

const Separator = styled.div`
	height: 12px;
	border-bottom: 1px solid rgb(47, 51, 54);
	background-color: rgb(21, 24, 28);
`;
const TweetsContainer = styled.div``;
const TweetContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
	padding-top: 0.75rem;
	display: flex;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
	cursor: pointer;
	border-bottom: 1px solid rgb(47, 51, 54);
`;

const UserImageWrapper = styled.div`
	height: 24px;
	margin-right: 12px;
`;
const UserImage = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 9999px;
`;

const TweetHeader = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	height: 20px;
`;
const FlexContainer = styled.div`
	display: flex;
`;
const Name = styled.span`
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
	margin-right: 5px;
`;
const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-right: 5px;
`;
const HeightWrapper = styled.div`
	height: 20px;
`;
const TweetDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
`;

const TweetContentWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	color: #fff;
	font-weight: 400;
	font-size: 15px;
	margin-top: 1rem;
`;

const TweetContent = styled.pre`
	display: flex;
	flex-grow: 1;
	color: #fff;
	font-weight: 400;
	font-size: 15px;
	font-family: inherit;
	margin-top: 1rem;
`;

const TweetImage = styled.img<{ url?: string }>`
	max-width: 504px;
	max-height: 234.92px;
	width: 100%;
	cursor: pointer;
	border-radius: 16px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	margin-top: 1rem;
`;

const TweetInteraction = styled.div`
	max-width: 425px;
	width: 100%;
	margin-top: 12px;
	justify-content: space-between;
`;

const BaseIcon = styled.div`
	width: 1.25em;
	height: 1.25em;
	fill: rgb(110, 118, 125);
`;

const CommentSVG = BaseIcon.withComponent(Comment);
const RetweetSVG = BaseIcon.withComponent(Retweet);
const HeartSVG = BaseIcon.withComponent(Heart);
const ShareSVG = BaseIcon.withComponent(Share);

const IconHover = styled.div`
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	transition: 200ms;
	padding: 0.5rem;
	/* &:hover {
		background-color: rgba(29, 161, 242, 1);
	} */
`;

const Comments = styled.span`
	font-size: 13px;
	color: rgb(110, 118, 125);
	padding: 0 0.75rem;
`;
const Container = styled.div`
	display: flex;
	align-items: center;
`;

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
							<HomeLayout>
								<Header>
									<Title to="/home">Home</Title>
									<IconWrapper>
										<Icon />
									</IconWrapper>
								</Header>
								<CreateTweet />
								<Separator></Separator>
								<TweetsContainer>
									<Tweet />
								</TweetsContainer>
							</HomeLayout>
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

const Tweet: React.FC = () => {
	const { user } = useAuth();
	return (
		<TweetContainer>
			<GridColumn>
				<UserImageWrapper>
					<UserImage src={user?.profilePicture} />
				</UserImageWrapper>

				<GridRow>
					<TweetHeader>
						<FlexContainer>
							<Name>{user?.name}</Name>
							<Username>{'@' + user?.username}</Username>
							<TweetDate>· 32m</TweetDate>
						</FlexContainer>
						<HeightWrapper>
							<IconWrapper>
								<DotsSVG></DotsSVG>
							</IconWrapper>
						</HeightWrapper>
					</TweetHeader>
					<TweetContentWrapper>
						<TweetContent>
							{`$100.00 Cash Giveaway Wrapped present

- Predict the "Total USD earned" for the end of April
- Reply with your guess & your Freeskins ID
- Retweet

Rolling on April 30th Money bag`}
						</TweetContent>
					</TweetContentWrapper>
					<TweetImage src="https://pbs.twimg.com/media/Ey6i7jEXIAESWuT?format=jpg&name=small"></TweetImage>
					<TweetInteraction>
						<Container>
							<IconHover>
								<CommentSVG />
							</IconHover>
							<Comments>64</Comments>
						</Container>
					</TweetInteraction>
				</GridRow>
			</GridColumn>
		</TweetContainer>
	);
};

export default App;
