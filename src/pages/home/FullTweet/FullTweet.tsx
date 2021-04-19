import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useHistory, useParams } from 'react-router';
import { ConfirmDeletionModal } from '../../../components/modals/ConfirmDeletionModal';
import { IconWrapper } from '../../../components/side-panel/Atoms';
import { delay } from '../../../helpers';
import { TweetsContext } from '../../../hooks/TweetsContext';
import { FullTweet as Tweet } from '../../../models/FullTweet';
import { tweetsService } from '../../../services/tweets.service';
import { LoaderWrapper } from '../Feed';
import {
	FETCH_COMMENTS_LIMIT,
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
import { Comment as TweetCommentProp } from '../../../models/FullTweet';

export const FullTweet: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [tweet, setTweet] = useState<Tweet>();
	const [comments, setComments] = useState<TweetCommentProp[]>([]);
	console.log(comments);
	const { id: tweetId } = useParams<{ id: string }>();
	const history = useHistory();
	const offsetRef = useRef(0);

	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	const fetchComments = useCallback(async () => {
		if (tweet) {
			const response = await tweetsService.getTweetComments(
				tweet._id,
				offsetRef.current,
				FETCH_COMMENTS_LIMIT
			);

			if (response && response.length > 0) {
				setComments(prev => [...prev!, ...response]);
				offsetRef.current = offsetRef.current + response.length;
			}
		}
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
					{tweet ? (
						<>
							<TweetData
								{...tweet}
								openDeletionModal={openDeletionModal}
							/>
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
					{comments &&
						comments.map(comment => (
							<Comment
								author={comment.author}
								_id={comment._id}
								createdAt={comment.createdAt}
								message={comment.message}
								attachment={comment.attachment}
								numberOfLikes={comment.numberOfLikes}
								numberOfRetweets={comment.numberOfRetweets}
								numberOfComments={comment.numberOfComments}
							></Comment>
						))}
				</InfiniteScrolling>
			</TweetWrapper>
		</>
	);
};
