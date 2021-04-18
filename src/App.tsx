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
import { Activity } from './components/icons/TweetModal';
import { IconHover } from './pages/home/TweetInteraction';
import {
	Comment,
	Heart,
	Retweet,
	RetweetFilled,
	Share,
} from './components/icons/TweetInteraction';
import { Container } from './components/user/Atoms';
import { AnimatePresence } from 'framer-motion';
import { RetweetModal } from './components/modals/RetweetModal';
import { AnimatedHeart } from './components/icons/AnimatedHeart';
import { CommentModal } from './components/modals/CommentModal';
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
	padding-bottom: 0;
	border-bottom: 1px solid rgb(47, 51, 54);
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
	display: flex;
	cursor: default;
`;

const CreatedAtDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 15px;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

const Platform = styled(CreatedAtDate)`
	margin-left: 5px;
`;

const Dot = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-left: 5px;
	cursor: pointer;
`;

const ViewActivityWrapper = styled.div`
	display: flex;
	border-top: 1px solid rgb(47, 51, 54);
	cursor: pointer;
	padding: 1rem 0;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

const ViewActivitySVG = styled(Activity)`
	padding-right: 4px;
	fill: rgb(110, 118, 125);
	height: 1.25em;
	width: 1.25em;
	margin-right: 5px;
`;

const ViewActivityLabel = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	cursor: pointer;
`;

const TweetInteractionsWrapper = styled.div`
	height: 48px;
	display: flex;
	justify-content: space-around;
	border-top: 1px solid rgb(47, 51, 54);
	align-items: center;
`;

const BaseIcon = styled.svg`
	width: 1.5em;
	height: 1.5em;
	fill: rgb(110, 118, 125);
`;

const CommentSVG = BaseIcon.withComponent(Comment);

const CommentWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${CommentSVG} {
		fill: rgba(29, 161, 242, 1);
	}
`;

const RetweetFilledSVG = BaseIcon.withComponent(RetweetFilled);

const RetweetSVG = BaseIcon.withComponent(Retweet);

const HeartSVG = BaseIcon.withComponent(Heart);

const RetweetWrapper = styled(Container)<{ retweeted?: boolean }>`
	position: relative;
	&:hover ${IconHover} {
		background-color: rgba(23, 191, 99, 0.1);
	}
	&:hover ${RetweetSVG} {
		fill: rgb(23, 191, 99);
	}

	&:hover ${RetweetFilledSVG} {
		fill: rgb(23, 191, 99);
	}

	${RetweetFilledSVG} {
		fill: ${props => props.retweeted && 'rgb(23, 191, 99);'};
	}
`;

const IconHoverAnimated = styled(IconHover)`
	padding: 0;
	width: 40px;
	height: 40px;
`;

const HeartWrapper = styled(Container)<{ liked?: boolean }>`
	&:hover ${IconHover} {
		background-color: rgba(224, 36, 94, 0.1);
	}
	&:hover ${HeartSVG} {
		fill: rgb(224, 36, 94);
	}

	&:hover ${IconHoverAnimated} {
		background-color: rgba(224, 36, 94, 0.1);
	}
`;

const ShareSVG = BaseIcon.withComponent(Share);

const ShareWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${ShareSVG} {
		fill: rgba(29, 161, 242, 1);
	}
`;

const Ammounts = styled.div`
	display: flex;
	padding: 1rem 4px;
	border-top: 1px solid rgb(47, 51, 54);
`;

const AmmountWrapper = styled.div`
	display: flex;
	margin-right: 20px;
`;

const Ammount = styled.span`
	font-weight: 700;
	font-size: 15px;
	color: rgb(217, 217, 217);
	margin-right: 4px;
`;

const AmmountLabel = styled.span`
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const getTweetDate = (date: Date) => {
		const hour = date.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
		const day = date.getDate();
		const month = monthsMap.get(date.getMonth());
		const year = date.getFullYear();
		return `${hour} · ${month} ${day}, ${year}`;
	};

	const date = useMemo(() => {
		if (tweet) {
			return getTweetDate(new Date(tweet.createdAt));
		}
		return '1m';
	}, [tweet]);

	const toggleLike = async () => {
		if (tweet) {
			if (tweet.likedByUser) {
				await tweetsService.unlikeTweet(tweet._id);
			} else {
				await tweetsService.likeTweet(tweet._id);
			}
			if (tweet) {
				setTweet({
					...tweet,
					numberOfLikes:
						tweet.numberOfLikes + (tweet.likedByUser ? -1 : 1),
					likedByUser: !tweet.likedByUser,
				});
			}
		}
	};

	const toggleRetweet = async () => {
		if (tweet) {
			if (tweet.retweetedByUser) {
				await tweetsService.unretweetTweet(tweet._id);
			} else {
				await tweetsService.retweetTweet(tweet._id);
			}
			setTweet({
				...tweet,
				numberOfRetweets:
					tweet.numberOfRetweets + (tweet.retweetedByUser ? -1 : 1),
				retweetedByUser: !tweet.retweetedByUser,
			});
		}
	};

	useEffect(() => {
		delay(200).then(() => tweetsService.getTweet(tweetId).then(setTweet));
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
								<Dot> · </Dot>
								<Platform>Twitter Web App</Platform>
							</DateBar>
							{tweet.author.username === user?.username && (
								<ViewActivityWrapper>
									<ViewActivitySVG></ViewActivitySVG>
									<ViewActivityLabel>
										View Tweet activity
									</ViewActivityLabel>
								</ViewActivityWrapper>
							)}
							{(tweet.numberOfRetweets > 0 ||
								tweet.numberOfLikes > 0) && (
								<Ammounts>
									{tweet.numberOfRetweets > 0 && (
										<AmmountWrapper>
											<Ammount>
												{tweet.numberOfRetweets}
											</Ammount>
											<AmmountLabel>
												Retweets
											</AmmountLabel>
										</AmmountWrapper>
									)}
									{tweet.numberOfLikes > 0 && (
										<AmmountWrapper>
											<Ammount>
												{tweet.numberOfLikes}
											</Ammount>
											<AmmountLabel>Likes</AmmountLabel>
										</AmmountWrapper>
									)}
								</Ammounts>
							)}
							<FullTweetInteractions
								tweet={tweet}
								toggleLike={toggleLike}
								toggleRetweet={toggleRetweet}
							/>
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

const FullTweetInteractions: React.FC<{
	tweet: FullTweet;
	toggleLike: () => void;
	toggleRetweet: () => void;
}> = ({ tweet, toggleLike, toggleRetweet }) => {
	const { show, openModal, ref, closeModal } = useModal();
	const {
		show: showCommentModal,
		openModal: openCommentModal,
		ref: commentModalRef,
		closeModal: closeCommentModal,
	} = useModal();
	return (
		<TweetInteractionsWrapper>
			<CommentWrapper onClick={openCommentModal}>
				<IconHover>
					<CommentSVG />
				</IconHover>
				{showCommentModal && (
					<CommentModal
						author={tweet.author}
						createdAt={tweet.createdAt}
						message={tweet.message}
						reference={commentModalRef}
						closeModal={closeCommentModal}
					/>
				)}
			</CommentWrapper>
			<RetweetWrapper
				retweeted={tweet.retweetedByUser}
				onClick={openModal}
			>
				{tweet.retweetedByUser ? (
					<IconHover>
						<RetweetFilledSVG />
					</IconHover>
				) : (
					<IconHover>
						<RetweetSVG />
					</IconHover>
				)}
				<AnimatePresence>
					{show && (
						<RetweetModal
							reference={ref}
							callback={toggleRetweet}
							isRetweeted={tweet.retweetedByUser}
							tweetId={tweet._id}
							closeModal={closeModal}
						/>
					)}
				</AnimatePresence>
			</RetweetWrapper>
			<HeartWrapper liked={tweet.likedByUser} onClick={toggleLike}>
				{tweet.likedByUser ? (
					<IconHoverAnimated>
						<AnimatedHeart width="70px" height="70px" />
					</IconHoverAnimated>
				) : (
					<IconHover>
						<HeartSVG />
					</IconHover>
				)}
			</HeartWrapper>
			<ShareWrapper>
				<IconHover>
					<ShareSVG />
				</IconHover>
			</ShareWrapper>
		</TweetInteractionsWrapper>
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
