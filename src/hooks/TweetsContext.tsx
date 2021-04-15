import React, { createContext, useCallback, useRef, useState } from 'react';
import { TweetPreview } from '../models/TweetPreview';
import { tweetsService } from '../services/tweets.service';

type TweetsContextProps = {
	tweets: TweetPreview[];
	isLoading: boolean;
	deleteTweet: (id: string) => void;
	fetchTweets: () => void;
	createTweet: (message: string, attachment: string) => void;
};

export const TweetsContext = createContext<TweetsContextProps>({
	tweets: [],
	isLoading: true,
	deleteTweet: (id: string) => {},
	createTweet: (message: string, attachment: string) => {},
	fetchTweets: () => {},
});

const FETCH_TWEETS_LIMIT = 10;

export const TweetsProvider: React.FC = ({ children }) => {
	const [tweets, setTweets] = useState<TweetPreview[]>([]);
	const [isLoading, setIsLoading] = useState(true);
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

		setIsLoading(false);

		if (response && response.results.length > 0) {
			setTweets(prev => [...prev, ...response.results]);
			offsetRef.current = offsetRef.current + response.results.length;
		}
	}, []);
	const deleteTweet = async (id: string) => {
		const response = await tweetsService.deleteTweet(id);
		if (response) {
			setTweets(prev => prev.filter(tweet => tweet._id !== response));
		}
	};
	return (
		<TweetsContext.Provider
			value={{ tweets, isLoading, fetchTweets, createTweet, deleteTweet }}
		>
			{children}
		</TweetsContext.Provider>
	);
};
