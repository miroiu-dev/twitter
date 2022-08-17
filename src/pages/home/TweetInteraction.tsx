import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { AnimatedHeart } from '../../components/icons/AnimatedHeart';
import {
	Comment,
	Heart,
	Retweet,
	RetweetFilled,
	Share,
} from '../../components/icons/TweetInteraction';
import { Activity } from '../../components/icons/TweetModal';
import { CommentModal } from '../../components/modals/CommentModal';
import { RetweetModal } from '../../components/modals/RetweetModal';
import { useAuth } from '../../hooks/useAuth';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTweet } from '../../hooks/useTweet';

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
	createdAt?: string;
	message?: string;
	tweetId: string;
	canComment?: boolean;
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
	createdAt,
	message,
	tweetId,
	canComment: cannotComment,
}) => {
	const { user } = useAuth();

	const [isToggled, setIsToggled] = useState(false);

	const toggle = useCallback(
		() => setIsToggled(!isToggled),
		[isToggled, setIsToggled]
	);

	const [isOpen, setIsOpen] = useState(false);

	const show = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

	const { createComment } = useTweet(id);

	const activityRef = useRef<HTMLDivElement | null>(null);
	const retweetRef = useRef<HTMLDivElement | null>(null);
	useClickOutside(retweetRef, show);

	return (
		<TweetInteraction onClick={ev => ev.stopPropagation()}>
			<CommentWrapper onClick={toggle}>
				<IconHover>
					<CommentSVG />
				</IconHover>
				<Ammount>{numberOfComments}</Ammount>
				<CommentModal
					onReply={createComment}
					isOpen={!cannotComment && isToggled}
					onClose={toggle}
					author={author}
					createdAt={createdAt!}
					message={message!}
					tweetId={tweetId}
				/>
			</CommentWrapper>
			<RetweetWrapper retweeted={retweetedByUser} onClick={show}>
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
					{isOpen && (
						<RetweetModal
							ref={retweetRef}
							callback={toggleRetweet}
							isRetweeted={retweetedByUser}
							tweetId={id}
							closeModal={show}
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
				<ActivityWrapper ref={activityRef}>
					<IconHover>
						<ActivitySVGInteraction />
					</IconHover>
				</ActivityWrapper>
			)}
		</TweetInteraction>
	);
};
