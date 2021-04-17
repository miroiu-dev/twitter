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
import { DotsSVG, IconWrapper } from './components/side-panel/Atoms';
import { Arrow } from './components/icons/Arrow';
import { TweetInfo } from './pages/home/TweetInfo';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { tweetsService } from './services/tweets.service';
import { FullTweet } from './models/FullTweet';
import { delay } from './helpers';
import Loader from 'react-loader-spinner';
import { LoaderWrapper } from './pages/home/Feed';
import { UserContext } from './hooks/UserContext';
import {
	TweetOptionsModalSelf,
	TweetOptionsModalUser,
} from './pages/home/TweetOptionsModal';
import { useModal } from './hooks/useModal';
import { ConfirmDeletionModal } from './components/modals/ConfirmDeletionModal';
import { HeightWrapper, Wrapper } from './pages/home/TweetHeader';
import { ResponsiveImage } from './components/ResponsiveImage';
import { monthsMap } from './utils/getReadableDate';
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

const TweetDataWrapper = styled.div`
	cursor: pointer;
	padding: 0.75rem 1rem;
`;

const FlexRow = styled.div`
	display: flex;
`;
const FlexRowJustifyContent = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
`;
const ProfileImageWrapper = styled.div`
	margin-right: 12px;
`;
const ProfileImage = styled.img`
	border-radius: 9999px;
	width: 48px;
	height: 48px;
	transition: 200ms;
	&:hover {
		filter: brightness(0.8);
	}
`;

export const TweetContentWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 1.438rem;
	line-height: 28px;
	font-family: inherit;
	margin-top: 12px;
	cursor: text;
`;

export const TweetContent = styled.pre`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 1.438rem;
	line-height: 28px;
	font-family: inherit;
	margin: 0;
`;

const TweetImage = styled(ResponsiveImage)`
	margin-top: 1rem;
`;

const DateBar = styled.div`
	margin: 1rem 0;
`;

const CreatedAtDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 15px;
`;

const Tweet: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [tweet, setTweet] = useState<FullTweet>();

	const { id: tweetId } = useParams<{ id: string }>();
	const history = useHistory();
	const { user } = useContext(UserContext);

	const { closeModal, openModal, ref, show } = useModal();
	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};

	const getTweetDate = (date: Date) => {
		const minutes = date.getMinutes();
		const hours = date.getHours();
		const month = date.getMonth();
		const Month = monthsMap.get(month);
		const year = date.getFullYear();
		const meridian = hours <= 12 ? 'AM' : 'PM';
		return `${hours}:${minutes} ${meridian} · ${Month} ${month}, ${year}`;
	};

	const date = useMemo(() => {
		if (tweet) {
			return getTweetDate(new Date(tweet.createdAt));
		}
		return '1m';
	}, [tweet]);
	//  date.toLocaleString([], { hour12: true});
	// const dateDiffDisplay = useMemo(() => {
	// 	if (tweet) {
	// 		return getReadableDate(new Date(tweet.createdAt));
	// 	}
	// 	return '1m';
	// }, [tweet]);

	useEffect(() => {
		delay(1000).then(() => tweetsService.getTweet(tweetId).then(setTweet));
	}, [tweetId]);

	return (
		<>
			{isOpen && tweet && (
				<ConfirmDeletionModal
					closeModal={closeDeletionModal}
					tweetId={tweet._id}
				/>
			)}
			<TweetWrapper>
				<Header>
					<IconWrapper onClick={() => history.push('/home')}>
						<Icon />
					</IconWrapper>
					<Title>Tweet</Title>
				</Header>
				<TweetDataWrapper>
					{tweet ? (
						<>
							<FlexRow>
								<ProfileImageWrapper>
									<ProfileImage
										src={tweet.author.profilePicture}
									></ProfileImage>
								</ProfileImageWrapper>
								<FlexRowJustifyContent>
									<TweetInfo
										author={tweet.author}
										showDate={false}
										flexDirection="column"
									/>
									<HeightWrapper>
										<Wrapper onClick={openModal}>
											<DotsSVG></DotsSVG>
										</Wrapper>
										{tweet.author.username !==
										user!.username ? (
											<TweetOptionsModalUser
												author={tweet.author}
												reference={ref}
												show={show}
											/>
										) : (
											<TweetOptionsModalSelf
												author={tweet.author}
												reference={ref}
												show={show}
												callback={openDeletionModal}
												secondaryCallback={closeModal}
											/>
										)}
									</HeightWrapper>
								</FlexRowJustifyContent>
							</FlexRow>
							<TweetContentWrapper>
								<TweetContent>{tweet.message}</TweetContent>
							</TweetContentWrapper>
							{tweet.attachment && (
								<TweetImage
									maxWidth={true}
									src={tweet.attachment}
								></TweetImage>
							)}
							<DateBar>
								<CreatedAtDate>{date}</CreatedAtDate>
							</DateBar>
						</>
					) : (
						<LoaderWrapper>
							<Loader
								type="Oval"
								color="rgb(29, 161, 242)"
								height={30}
								width={30}
							/>
						</LoaderWrapper>
					)}
				</TweetDataWrapper>
			</TweetWrapper>
		</>
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
