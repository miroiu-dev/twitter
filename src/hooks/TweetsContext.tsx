import React, { createContext, useState } from 'react';
import { TweetPreview } from '../models/TweetPreview';
import { tweetsService } from '../services/tweets.service';

type TweetsContextProps = {
	tweets: TweetPreview[];
	createTweet: (message: string, attachment: string) => void;
};

export const TweetsContext = createContext<TweetsContextProps>({
	tweets: [],
	createTweet: () => {},
});

export const TweetsProvider: React.FC = ({ children }) => {
	const [tweets, setTweets] = useState<TweetPreview[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const createTweet = async (message: string, attachment: string) => {
		const response = await tweetsService.createTweet(message, attachment);
		if (response) {
			setTweets(prev => [response, ...prev]);
		}
	};

	return (
		<TweetsContext.Provider value={{ tweets, createTweet }}>
			{children}
		</TweetsContext.Provider>
	);
};
