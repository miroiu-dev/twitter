import { AnimatePresence } from 'framer-motion';
import { useCallback, useContext, useRef, useState } from 'react';
import { AnimatedHeart } from '../../../components/icons/AnimatedHeart';
import { CommentModal } from '../../../components/modals/CommentModal';
import { RetweetModal } from '../../../components/modals/RetweetModal';
import { TweetsContext } from '../../../hooks/TweetsContext';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { FullTweet } from '../../../models/FullTweet';
import { IconHover } from '../TweetInteraction';
import {
	CommentSVG,
	CommentWrapper,
	HeartSVG,
	HeartWrapper,
	IconHoverAnimated,
	RetweetFilledSVG,
	RetweetSVG,
	RetweetWrapper,
	ShareSVG,
	ShareWrapper,
	TweetInteractionsWrapper,
} from './Atoms';

export const FullTweetInteractions: React.FC<{
	tweet: FullTweet;
	toggleLike: () => void;
	toggleRetweet: () => void;
	createComment: (message: string, attachement: string) => void;
}> = ({ tweet, toggleLike, toggleRetweet, createComment }) => {
	// const { show, openModal, closeModal } = useModal();
	const div = useRef<HTMLDivElement | null>(null);
	const [isToggled, setIsToggled] = useState(false);

	const toggle = useCallback(() => setIsToggled(!isToggled), [
		isToggled,
		setIsToggled,
	]);

	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

	const { toggleLikeUpdate, toggleRetweetUpdate } = useContext(TweetsContext);
	useClickOutside(div, open);
	return (
		<TweetInteractionsWrapper>
			<CommentWrapper onClick={toggle}>
				<IconHover>
					<CommentSVG />
				</IconHover>
				<CommentModal
					onReply={createComment}
					isOpen={isToggled}
					onClose={toggle}
					author={tweet.author}
					createdAt={tweet.createdAt}
					message={tweet.message}
					tweetId={tweet._id}
				/>
			</CommentWrapper>
			<RetweetWrapper retweeted={tweet.retweetedByUser} onClick={open}>
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
					{isOpen && (
						<RetweetModal
							ref={div}
							callback={() => {
								toggleRetweet();
								toggleRetweetUpdate(tweet._id);
							}}
							isRetweeted={tweet.retweetedByUser}
							tweetId={tweet._id}
							closeModal={open}
						/>
					)}
				</AnimatePresence>
			</RetweetWrapper>
			<HeartWrapper
				liked={tweet.likedByUser}
				onClick={() => {
					toggleLike();
					toggleLikeUpdate(tweet._id);
				}}
			>
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
