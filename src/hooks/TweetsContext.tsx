import React, {
	createContext,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';
import { TweetPreview } from '../models/TweetPreview';
import { tweetsService } from '../services/tweets.service';

type TweetsContextProps = {
	tweets: TweetPreview[];
	isLoading: boolean;
	deleteTweet: (id: string) => void;
	fetchTweets: () => void;
	createTweet: (message: string, attachment: string) => void;
	toggleLike: (id: string) => void;
	toggleRetweet: (id: string) => void;
	updateCommentCount: (id: string) => void;
	decrementNumberOfComments: (id: string) => void;
	toggleLikeUpdate: (id: string) => void;
	toggleRetweetUpdate: (id: string) => void;
	hasMore: boolean;
};

export const TweetsContext = createContext<TweetsContextProps>({
	tweets: [],
	isLoading: true,
	deleteTweet: () => {},
	createTweet: () => {},
	fetchTweets: () => {},
	toggleLike: () => {},
	toggleRetweet: () => {},
	updateCommentCount: () => {},
	decrementNumberOfComments: () => {},
	toggleLikeUpdate: () => {},
	toggleRetweetUpdate: () => {},
	hasMore: true,
});

const FETCH_TWEETS_LIMIT = 10;

export const TweetsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [tweets, setTweets] = useState<TweetPreview[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const offsetRef = useRef(0);

	const createTweet = async (message: string, attachment: string) => {
		setIsLoading(true);

		const response = await tweetsService.createTweet(message, attachment);
		if (response) {
			setTweets(prev => [response, ...prev]);
			offsetRef.current += 1;
		}

		setIsLoading(false);
	};

	const fetchTweets = useCallback(async () => {
		setIsLoading(true);

		const response = await tweetsService.getTweets(
			offsetRef.current,
			FETCH_TWEETS_LIMIT
		);

		if (response && response.results.length > 0) {
			setTweets(prev => [...prev, ...response.results]);
			offsetRef.current = offsetRef.current + response.results.length;
			if (offsetRef.current === response.totalTweets) {
				setHasMore(false);
			}
		}
	}, []);
	const deleteTweet = async (id: string) => {
		const response = await tweetsService.deleteTweet(id);
		if (response) {
			setTweets(prev => prev.filter(tweet => tweet._id !== response));
		}
	};

	const toggleLike = async (id: string) => {
		const foundTweets = tweets.filter(t => t._id === id);
		if (foundTweets.length > 0) {
			const tweet = foundTweets[0];
			if (tweet.likedByUser) {
				await tweetsService.unlikeTweet(id);
			} else {
				await tweetsService.likeTweet(id);
			}
			setTweets(prev =>
				prev.map(tweet =>
					tweet._id === id
						? {
								...tweet,
								numberOfLikes:
									tweet.numberOfLikes +
									(tweet.likedByUser ? -1 : 1),
								likedByUser: !tweet.likedByUser,
						  }
						: tweet
				)
			);
		}
	};

	const toggleRetweet = async (id: string) => {
		const foundTweets = tweets.filter(t => t._id === id);
		if (foundTweets.length > 0) {
			const tweet = foundTweets[0];
			if (tweet.retweetedByUser) {
				await tweetsService.unretweetTweet(id);
			} else {
				await tweetsService.retweetTweet(id);
			}
			setTweets(prev =>
				prev.map(tweet =>
					tweet._id === id
						? {
								...tweet,
								numberOfRetweets:
									tweet.numberOfRetweets +
									(tweet.retweetedByUser ? -1 : 1),
								retweetedByUser: !tweet.retweetedByUser,
						  }
						: tweet
				)
			);
		}
	};

	const updateCommentCount = async (id: string) => {
		setTweets(prev =>
			prev.map(tweet =>
				tweet._id === id
					? { ...tweet, numberOfComments: tweet.numberOfComments + 1 }
					: tweet
			)
		);
	};

	const decrementNumberOfComments = async (id: string) => {
		setTweets(prev =>
			prev.map(tweet =>
				tweet._id === id
					? { ...tweet, numberOfComments: tweet.numberOfComments - 1 }
					: tweet
			)
		);
	};

	const toggleLikeUpdate = (id: string) => {
		setTweets(prev =>
			prev.map(tweet =>
				tweet._id === id
					? {
							...tweet,
							numberOfLikes:
								tweet.numberOfLikes +
								(tweet.likedByUser ? -1 : 1),
							likedByUser: !tweet.likedByUser,
					  }
					: tweet
			)
		);
	};

	const toggleRetweetUpdate = (id: string) => {
		setTweets(prev =>
			prev.map(tweet =>
				tweet._id === id
					? {
							...tweet,
							numberOfRetweets:
								tweet.numberOfRetweets +
								(tweet.retweetedByUser ? -1 : 1),
							retweetedByUser: !tweet.retweetedByUser,
					  }
					: tweet
			)
		);
	};

	return (
		<TweetsContext.Provider
			value={{
				tweets,
				isLoading,
				fetchTweets,
				createTweet,
				deleteTweet,
				toggleLike,
				toggleRetweet,
				updateCommentCount,
				decrementNumberOfComments,
				toggleLikeUpdate,
				toggleRetweetUpdate,
				hasMore,
			}}
		>
			{children}
		</TweetsContext.Provider>
	);
};
