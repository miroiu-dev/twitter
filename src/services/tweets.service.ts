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

const getTweets = async (offset: number, limit: number) => {};

export const tweetsService = {
	createTweet,
	getTweets,
};
