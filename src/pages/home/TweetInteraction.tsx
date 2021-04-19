import styled from '@emotion/styled/macro';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { AnimatedHeart } from '../../components/icons/AnimatedHeart';
import {
	Comment,
	Heart,
	Retweet,
	RetweetFilled,
	Share,
} from '../../components/icons/TweetInteraction';
import { Activity } from '../../components/icons/TweetModal';
import { RetweetModal } from '../../components/modals/RetweetModal';
import { TweetsContext } from '../../hooks/TweetsContext';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';

const BaseTweetModalIcon = styled.svg`
	height: 1.25em;
	width: 1.25em;
`;
const ActivitySVG = BaseTweetModalIcon.withComponent(Activity);

const ActivitySVGInteraction = styled(ActivitySVG)`
	fill: rgb(110, 118, 125);
`;
export const Container = styled.div`
	display: flex;
	align-items: center;
	user-select: none;
`;
export const IconHover = styled.div`
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	transition: 200ms;
	padding: 0.5rem;
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

const Ammount = styled.span`
	font-size: 13px;
	color: rgb(110, 118, 125);
	padding: 0 0.75rem;
	transition: 200ms;
`;

const IconHoverAnimated = styled(IconHover)`
	padding: 0;
	width: 36px;
	height: 36px;
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
	position: relative;
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

const TweetInteraction = styled.div`
	display: flex;
	max-width: 425px;
	width: 100%;
	margin-top: 0.75rem;
	padding-bottom: 0.35rem;
	justify-content: space-between;
	margin-left: -10px;
`;

type TweetInteractionsProps = {
	numberOfComments: number;
	numberOfRetweets: number;
	numberOfLikes: number;
	author: {
		name: string;
		username: string;
		profilePicture?: string;
	};
	likedByUser: boolean;
	retweetedByUser: boolean;
	id: string;
	toggleLike: (id: string) => void;
	toggleRetweet: (id: string) => void;
};

export const TweetInteractions: React.FC<TweetInteractionsProps> = ({
	numberOfComments,
	numberOfRetweets,
	numberOfLikes,
	author,
	likedByUser,
	retweetedByUser,
	toggleLike,
	toggleRetweet,
	id,
}) => {
	const { user } = useAuth();
	const { show, openModal, ref, closeModal } = useModal();
	return (
		<TweetInteraction onClick={ev => ev.stopPropagation()}>
			<CommentWrapper>
				<IconHover>
					<CommentSVG />
				</IconHover>
				<Ammount>{numberOfComments}</Ammount>
			</CommentWrapper>
			<RetweetWrapper retweeted={retweetedByUser} onClick={openModal}>
				{retweetedByUser ? (
					<IconHover>
						<RetweetFilledSVG />
					</IconHover>
				) : (
					<IconHover>
						<RetweetSVG />
					</IconHover>
				)}
				<Ammount>{numberOfRetweets}</Ammount>
				<AnimatePresence>
					{show && (
						<RetweetModal
							ref={ref}
							callback={toggleRetweet}
							isRetweeted={retweetedByUser}
							tweetId={id}
							closeModal={closeModal}
						/>
					)}
				</AnimatePresence>
			</RetweetWrapper>
			<HeartWrapper liked={likedByUser} onClick={() => toggleLike(id)}>
				{likedByUser ? (
					<IconHoverAnimated>
						<AnimatedHeart width="60px" height="60px" />
					</IconHoverAnimated>
				) : (
					<IconHover>
						<HeartSVG />
					</IconHover>
				)}
				<Ammount>{numberOfLikes}</Ammount>
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
