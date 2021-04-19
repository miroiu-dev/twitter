import { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useHistory, useParams } from 'react-router';
import { ConfirmDeletionModal } from '../../../components/modals/ConfirmDeletionModal';
import { IconWrapper } from '../../../components/side-panel/Atoms';
import { TweetsContext } from '../../../hooks/TweetsContext';
import { LoaderWrapper } from '../Feed';
import {
	Header,
	Icon,
	InfiniteScrolling,
	Title,
	TweetDataWrapper,
	TweetWrapper,
} from './Atoms';
import { Comment } from './Comment';
import { TweetData } from './FullTweetData';
import { FullTweetInteractions } from './FullTweetInteractions';
import { useTweet } from '../../../hooks/useTweet';
import { AnimatePresence } from 'framer-motion';

export const FullTweet: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { id: tweetId } = useParams<{ id: string }>();
	const history = useHistory();

	const {
		tweet,
		comments,
		toggleLike,
		toggleCommentLike,
		toggleCommentRetweet,
		toggleRetweet,
		fetchComments,
		createComment,
		deleteComment,
	} = useTweet(tweetId);

	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		fetchComments().then(() => console.log('fetched'));
	}, [fetchComments]);

	const { deleteTweet } = useContext(TweetsContext);

	return (
		<>
			{isOpen && tweet && (
				<ConfirmDeletionModal
					closeModal={closeDeletionModal}
					onDelete={deleteTweet}
					redirect="/home"
					id={tweet._id}
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
					{tweet && (
						<>
							<TweetData
								{...tweet}
								openDeletionModal={openDeletionModal}
							/>
							<FullTweetInteractions
								tweet={tweet}
								toggleLike={toggleLike}
								toggleRetweet={toggleRetweet}
								createComment={createComment}
							/>
						</>
					)}
				</TweetDataWrapper>
				<InfiniteScrolling
					dataLength={comments.length}
					next={fetchComments}
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
					<AnimatePresence>
						{comments &&
							comments.map(comment => (
								<Comment
									key={comment._id}
									author={comment.author}
									_id={comment._id}
									tweetId={tweet!._id}
									createdAt={comment.createdAt}
									message={comment.message}
									attachment={comment.attachment}
									likedByUser={comment.likedByUser}
									retweetedByUser={comment.retweetedByUser}
									numberOfLikes={comment.numberOfLikes}
									numberOfRetweets={comment.numberOfRetweets}
									numberOfComments={comment.numberOfComments}
									toggleCommentLike={toggleCommentLike}
									toggleCommentRetweet={toggleCommentRetweet}
									deleteComment={deleteComment}
								></Comment>
							))}
					</AnimatePresence>
				</InfiniteScrolling>
			</TweetWrapper>
		</>
	);
};
