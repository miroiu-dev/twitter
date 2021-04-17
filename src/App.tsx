import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
	useParams,
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
import styled from '@emotion/styled/macro';
import { IconWrapper } from './components/side-panel/Atoms';
import { Arrow } from './components/icons/Arrow';
import { TweetInfo } from './pages/home/TweetInfo';
import React, { useEffect, useMemo, useState } from 'react';
import { tweetsService } from './services/tweets.service';
import { FullTweet } from './models/FullTweet';
import { getReadableDate } from './utils/getReadableDate';
import { delay } from './helpers';

const TweetWrapper = styled.div`
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
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
	position: sticky;
	top: 0;
	z-index: 4;
`;

const Icon = styled(Arrow)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
`;

const Title = styled.span`
	font-weight: 800;
	font-size: 1.25rem;
	color: rgb(217, 217, 217);
	text-decoration: none;
	margin-left: 1.5rem;
	cursor: pointer;
`;

const TweetContent = styled.div``;

const Tweet: React.FC = () => {
	const { id: tweetId } = useParams<{ id: string }>();
	const history = useHistory();
	const [tweet, setTweet] = useState<FullTweet>();

	const dateDiffDisplay = useMemo(() => {
		if (tweet) {
			return getReadableDate(new Date(tweet.createdAt));
		}
		return '1m';
	}, [tweet]);

	useEffect(() => {
		delay(1000).then(() => tweetsService.getTweet(tweetId).then(setTweet));
	}, [tweetId]);

	return (
		<TweetWrapper>
			<Header>
				<IconWrapper onClick={() => history.push('/home')}>
					<Icon />
				</IconWrapper>
				<Title>Tweet</Title>
			</Header>
			<TweetContent>
				{tweet ? (
					<TweetInfo author={tweet.author} date={dateDiffDisplay} />
				) : (
					<div style={{ color: 'white' }}>'Loading'</div>
				)}
			</TweetContent>
		</TweetWrapper>
	);
};

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
						<Route path="/explore"></Route>
						<Route path="/notifications"></Route>
						<Route path="/messages"></Route>
						<Route path="/bookmarks"></Route>
						<Route path="/lists"></Route>
						<Route path="/profile"></Route>
						<Route path="/more"></Route>
						<Route path="/tweet/:id">
							<Tweet />
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
