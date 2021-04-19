import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { AnimatedHeart } from '../../../components/icons/AnimatedHeart';
import { CommentModal } from '../../../components/modals/CommentModal';
import { RetweetModal } from '../../../components/modals/RetweetModal';
import { useModal } from '../../../hooks/useModal';
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
	const { show, openModal, ref, closeModal } = useModal();

	const [isToggled, setIsToggled] = useState(false);

	const toggle = useCallback(() => setIsToggled(!isToggled), [
		isToggled,
		setIsToggled,
	]);

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
							ref={ref}
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
