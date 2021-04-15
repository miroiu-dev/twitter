import axios from 'axios';
import { TweetPreview } from '../models/TweetPreview';
import { routes } from './routes';

const createTweet = async (message: string, attachment: string) => {
	try {
		const response = await axios.post<TweetPreview>(
			routes.tweets(),
			{
				message,
				attachment,
			},
			{ withCredentials: true }
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

type TweetsResponse = {
	results: TweetPreview[];
	offset: number;
	limit: number;
};

const getTweets = async (offset: number, limit: number) => {
	try {
		const response = await axios.get<TweetsResponse>(
			routes.fetchTweets(offset, limit),
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const tweetsService = {
	createTweet,
	getTweets,
};
