import React, { ReactNode, useContext, useEffect, useState } from 'react';
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
	RetweetFilled,
	Share,
} from './components/icons/TweetInteraction';
import { GridColumn, GridRow } from './pages/home/Atoms';
import { TweetPreview } from './models/TweetPreview';
import { TweetsContext } from './hooks/TweetsContext';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ResponsiveImage } from './components/ResponsiveImage';
import { AnimatedHeart } from './components/icons/AnimatedHeart';
import axios from 'axios';
import { routes } from './services/routes';
import {
	Activity,
	Block,
	Delete,
	Embed,
	Mute,
	NotInterseted,
	Pin,
	RemoveFromList,
	Report,
	Unfollow,
} from './components/icons/TweetModal';
import { useModal } from './hooks/useModal';
import { AnimatePresence, motion } from 'framer-motion';
import { ConfirmDeletionModal } from './components/modals/ConfirmDeletionModal';
const LeftPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const RightPanel = styled.div`
	display: flex;
	flex-direction: column;
`;

const HomeLayout = styled.div`
	max-width: 600px;
	width: 100%;
	border-left: 1px solid rgb(47, 51, 54);
	border-right: 1px solid rgb(47, 51, 54);
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

const Header = styled.div`
	height: 53px;
	padding: 0 1rem;
	background: #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
	position: sticky;
	top: 0;
	z-index: 4;
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
	margin-right: 12px;
`;
const UserImage = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 9999px;
	transition: 200ms;
	&:hover {
		filter: brightness(0.8);
	}
`;

const TweetHeader = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	height: 22px;
	margin-bottom: 2px;
`;
const FlexContainer = styled.div`
	display: flex;
	:hover {
	}
`;

const Name = styled.span`
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
	margin-right: 5px;
`;

const FlexRow = styled.div`
	display: flex;
	&:hover ${Name} {
		text-decoration: underline;
	}
`;

const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-right: 5px;
`;
const HeightWrapper = styled.div`
	height: 20px;
	position: relative;
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
`;

const TweetContent = styled.pre`
	display: flex;
	flex-grow: 1;
	color: #fff;
	font-weight: 400;
	font-size: 15px;
	font-family: inherit;
	margin: 0;
`;

const TweetImage = styled(ResponsiveImage)`
	margin-top: 1rem;
`;

const TweetInteraction = styled.div`
	display: flex;
	max-width: 425px;
	width: 100%;
	margin-top: 0.75rem;
	padding-bottom: 0.35rem;
	justify-content: space-between;
	margin-left: -10px;
`;

const BaseIcon = styled.div`
	width: 1.25em;
	height: 1.25em;
	fill: rgb(110, 118, 125);
	transition: 200ms;
`;

const CommentSVG = BaseIcon.withComponent(Comment);
const RetweetSVG = BaseIcon.withComponent(Retweet);
const HeartSVG = BaseIcon.withComponent(Heart);
const ShareSVG = BaseIcon.withComponent(Share);
const RetweetFilledSVG = BaseIcon.withComponent(RetweetFilled);
const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const InfiniteScrolling = styled(InfiniteScroll)`
	overflow-x: hidden !important;
`;

const App = () => {
	const { user } = useAuth();
	const { tweets, fetchTweets } = useContext(TweetsContext);

	useEffect(() => {
		fetchTweets();
	}, [fetchTweets]);

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

								<InfiniteScrolling
									dataLength={tweets.length} //This is important field to render the next data
									next={fetchTweets}
									hasMore={true}
									loader={
										<LoaderWrapper>
											<Loader
												type="Oval"
												color="rgb(29, 161, 242)"
												height={30}
												width={30}
											/>
										</LoaderWrapper>
									}
								>
									{tweets &&
										tweets.map(tweet => (
											<Tweet key={tweet._id} {...tweet} />
										))}
								</InfiniteScrolling>
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

const Wrapper = styled(IconWrapper)`
	margin-top: -7px;
`;

const monthsMap = new Map([
	[1, 'Jan'],
	[2, 'Feb'],
	[3, 'Mar'],
	[4, 'Apr'],
	[5, 'May'],
	[6, 'Jun'],
	[7, 'Jul'],
	[8, 'Aug'],
	[9, 'Sep'],
	[10, 'Oct'],
	[11, 'Nov'],
	[12, 'Dec'],
]);

const getReadableDate = (createdAt: Date) => {
	const now = new Date();

	const seconds = now.getSeconds() - createdAt.getSeconds();
	const minutes = now.getMinutes() - createdAt.getMinutes();
	const hours = now.getHours() - createdAt.getHours();
	const days = now.getDay() - createdAt.getDay();
	const months = now.getMonth() - createdAt.getMonth();
	const years = now.getFullYear() - createdAt.getFullYear();

	let year = '';
	let month = '';
	let day = '';

	if (years > 0) {
		year = `, ${createdAt.getFullYear()}`;
	}

	if (months > 0 || years > 0) {
		month = `${monthsMap.get(createdAt.getMonth())} `;
		day = createdAt.getDay().toString();
	} else if (days > 0) {
		day = `${days}d`;
	} else if (hours > 0) {
		day = `${hours}h`;
	} else if (minutes > 0) {
		day = `${minutes}m`;
	} else if (seconds > 3) {
		day = `${seconds}s`;
	} else {
		day = `Now`;
	}

	return `${month}${day}${year}`;
};

const Ammount = styled.span`
	font-size: 13px;
	color: rgb(110, 118, 125);
	padding: 0 0.75rem;
	transition: 200ms;
`;

const IconHover = styled.div`
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	transition: 200ms;
	padding: 0.5rem;
`;

const IconHoverAnimated = styled(IconHover)`
	padding: 0;
	width: 36px;
	height: 36px;
`;
const Container = styled.div`
	display: flex;
	align-items: center;
	user-select: none;
`;

const BaseTweetModalIcon = styled.svg`
	height: 1.25em;
	width: 1.25em;
`;

const NotInterestedSVG = BaseTweetModalIcon.withComponent(NotInterseted);
const UnfollowSVG = BaseTweetModalIcon.withComponent(Unfollow);
const RemoveFromListSVG = BaseTweetModalIcon.withComponent(RemoveFromList);
const MuteSVG = BaseTweetModalIcon.withComponent(Mute);
const BlockSVG = BaseTweetModalIcon.withComponent(Block);
const EmbedSVG = BaseTweetModalIcon.withComponent(Embed);
const ReportSVG = BaseTweetModalIcon.withComponent(Report);

const DeleteSVG = BaseTweetModalIcon.withComponent(Delete);
const PinSVG = BaseTweetModalIcon.withComponent(Pin);
const ActivitySVG = BaseTweetModalIcon.withComponent(Activity);
const ActivitySVGInteraction = styled(ActivitySVG)`
	fill: rgb(110, 118, 125);
`;
const CommentWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${CommentSVG} {
		fill: rgba(29, 161, 242, 1);
	}
	&:hover ${Ammount} {
		color: rgba(29, 161, 242, 1);
	}
`;

const RetweetWrapper = styled(Container)<{ retweeted?: boolean }>`
	&:hover ${IconHover} {
		background-color: rgba(23, 191, 99, 0.1);
	}
	&:hover ${RetweetSVG} {
		fill: rgb(23, 191, 99);
	}
	&:hover ${Ammount} {
		color: rgb(23, 191, 99);
	}
	&:hover ${RetweetFilledSVG} {
		fill: rgb(23, 191, 99);
	}

	${Ammount} {
		color: ${props => props.retweeted && 'rgb(23, 191, 99);'};
	}
	${RetweetFilledSVG} {
		fill: ${props => props.retweeted && 'rgb(23, 191, 99);'};
	}
`;

const HeartWrapper = styled(Container)<{ liked?: boolean }>`
	&:hover ${IconHover} {
		background-color: rgba(224, 36, 94, 0.1);
	}
	&:hover ${HeartSVG} {
		fill: rgb(224, 36, 94);
	}
	&:hover ${Ammount} {
		color: rgb(224, 36, 94);
	}
	&:hover ${IconHoverAnimated} {
		background-color: rgba(224, 36, 94, 0.1);
	}
	${Ammount} {
		color: ${props => props.liked && 'rgb(224, 36, 94)'};
	}
`;

const ShareWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${ShareSVG} {
		fill: rgba(29, 161, 242, 1);
	}
`;

const ActivityWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${ActivitySVGInteraction} {
		fill: rgba(29, 161, 242, 1);
	}
`;

const TweetModal = styled(motion.div)`
	position: absolute;
	width: 340px;
	z-index: 3;
	top: 0;
	pointer-events: all;
	left: -305px;
	background-color: #000;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
	/* display: flex;
	flex-direction: column; */
`;

const SelftTweetModal = styled(TweetModal)``;

const Tweet: React.FC<TweetPreview> = ({
	attachment,
	author,
	createdAt,
	message,
	numberOfComments,
	_id,
	retweet,
	likes,
}) => {
	const dateDiffDisplay = getReadableDate(new Date(createdAt));
	const { openModal, ref, show } = useModal();
	const [isOpen, setIsOpen] = useState(false);
	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};
	const { user } = useAuth();

	return (
		<>
			{isOpen && (
				<ConfirmDeletionModal
					closeModal={closeDeletionModal}
					tweetId={_id}
				/>
			)}
			<TweetContainer>
				<GridColumn>
					<UserImageWrapper>
						<UserImage
							draggable={false}
							src={author.profilePicture}
						/>
					</UserImageWrapper>

					<GridRow>
						<TweetHeader>
							<FlexContainer>
								<FlexRow>
									<Name>{author.name}</Name>
									<Username>@{author.username}</Username>
								</FlexRow>
								<TweetDate> · {dateDiffDisplay}</TweetDate>
							</FlexContainer>
							<HeightWrapper>
								<Wrapper onClick={openModal}>
									<DotsSVG></DotsSVG>
								</Wrapper>
								{author.username !== user!.username ? (
									<AnimatePresence>
										{show && (
											<TweetModal
												ref={ref}
												initial={{
													height: '0px',
													opacity: 0,
												}}
												animate={{
													height: 'auto',
													opacity: 1,
												}}
											>
												<TweetOption
													icon={<NotInterestedSVG />}
													label="Not interested in this Tweet"
												></TweetOption>
												<TweetOption
													icon={<UnfollowSVG />}
													label={`Unfollow @${author.username}`}
												></TweetOption>
												<TweetOption
													icon={<RemoveFromListSVG />}
													label={`Add/remove @${author.username} from Lists`}
												></TweetOption>
												<TweetOption
													icon={<MuteSVG />}
													label={`Mute @${author.username}`}
												></TweetOption>
												<TweetOption
													icon={<BlockSVG />}
													label={`Block @${author.username}`}
												></TweetOption>{' '}
												<TweetOption
													icon={<EmbedSVG />}
													label="Embed Tweet"
												></TweetOption>{' '}
												<TweetOption
													icon={<ReportSVG />}
													label="Report Tweet"
												></TweetOption>
											</TweetModal>
										)}
									</AnimatePresence>
								) : (
									<AnimatePresence>
										{show && (
											<SelftTweetModal
												ref={ref}
												initial={{
													height: '0px',
													opacity: 0,
												}}
												animate={{
													height: 'auto',
													opacity: 1,
												}}
											>
												<TweetOption
													icon={<DeleteSVG />}
													label="Delete"
													color="rgb(224, 36, 94)"
													callback={openDeletionModal}
												></TweetOption>
												<TweetOption
													icon={<PinSVG />}
													label="Pin to your profile"
												></TweetOption>
												<TweetOption
													icon={<RemoveFromListSVG />}
													label={`Add/remove @${author.username} from Lists`}
												></TweetOption>
												<TweetOption
													icon={<EmbedSVG />}
													label="Embed Tweet"
												></TweetOption>
												<TweetOption
													icon={<ActivitySVG />}
													label="View Tweet activity"
												></TweetOption>
											</SelftTweetModal>
										)}
									</AnimatePresence>
								)}
							</HeightWrapper>
						</TweetHeader>
						<TweetContentWrapper>
							<TweetContent>{message}</TweetContent>
						</TweetContentWrapper>
						{attachment && (
							<TweetImage src={attachment}></TweetImage>
						)}
						<TweetInteractions
							numberOfComments={numberOfComments}
							likes={likes}
							retweet={retweet}
							author={author}
						/>
					</GridRow>
				</GridColumn>
			</TweetContainer>
		</>
	);
};

export default App;

type TweetOptionProps = {
	label: string;
	icon: ReactNode;
	color?: string;
	callback?: () => void;
};

const Label = styled.span`
	font-weight: 400;
	font-size: 0.938rem;
`;

const OptionWrapper = styled.div<{ color?: string }>`
	padding: 1rem;
	display: flex;
	align-items: center;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
	${Label} {
		color: ${props => props.color || 'rgb(217, 217, 217)'}!important;
	}
`;

const OptionIconWrapper = styled.div<{ color?: string }>`
	margin-right: 0.75rem;
	height: 1.25em;
	width: 1.25em;
	fill: ${props => props.color || 'rgb(110, 118, 125)'};
`;

const TweetOption: React.FC<TweetOptionProps> = ({
	label,
	icon,
	color,
	callback,
}) => {
	return (
		<OptionWrapper color={color} onClick={() => callback && callback()}>
			<OptionIconWrapper color={color}>{icon} </OptionIconWrapper>
			<Label>{label}</Label>
		</OptionWrapper>
	);
};

type TweetInteractionsProps = {
	numberOfComments: number;
	retweet: number;
	likes: number;
	author: {
		name: string;
		username: string;
		profilePicture: string;
	};
};

const TweetInteractions: React.FC<TweetInteractionsProps> = ({
	numberOfComments,
	retweet,
	likes,
	author,
}) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isRetweeted, setIsRetweeted] = useState(false);
	const { user } = useAuth();
	return (
		<TweetInteraction>
			<CommentWrapper>
				<IconHover>
					<CommentSVG />
				</IconHover>
				<Ammount>{numberOfComments}</Ammount>
			</CommentWrapper>
			<RetweetWrapper
				retweeted={isRetweeted}
				onClick={() => setIsRetweeted(prev => !prev)}
			>
				{isRetweeted ? (
					<IconHover>
						<RetweetFilledSVG />
					</IconHover>
				) : (
					<IconHover>
						<RetweetSVG />
					</IconHover>
				)}
				<Ammount>{retweet}</Ammount>
			</RetweetWrapper>
			<HeartWrapper
				liked={isLiked}
				onClick={() => setIsLiked(prev => !prev)}
			>
				{isLiked ? (
					<IconHoverAnimated>
						<AnimatedHeart />
					</IconHoverAnimated>
				) : (
					<IconHover>
						<HeartSVG />
					</IconHover>
				)}
				<Ammount>{likes}</Ammount>
			</HeartWrapper>
			<ShareWrapper>
				<IconHover>
					<ShareSVG />
				</IconHover>
			</ShareWrapper>
			{author.username === user!.username && (
				<ActivityWrapper>
					<IconHover>
						<ActivitySVGInteraction />
					</IconHover>
				</ActivityWrapper>
			)}
		</TweetInteraction>
	);
};
