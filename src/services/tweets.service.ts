import axios from 'axios';
import { delay } from '../helpers';
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
		await delay(500);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteTweet = async (id: string) => {
	try {
		await axios.delete(`${routes.tweets()}/${id}`, {
			withCredentials: true,
		});
		return id;
	} catch (err) {
		console.log(err);
	}
};

const likeTweet = async (id: string) => {
	try {
		const response = await axios.put(
			routes.likes(id),
			{},
			{
				withCredentials: true,
			}
		);
		console.log(response.status);
	} catch (err) {
		console.log(err);
	}
};

const unlikeTweet = async (id: string) => {
	try {
		const response = await axios.delete(routes.likes(id), {
			withCredentials: true,
		});
		console.log(response.status);
	} catch (err) {
		console.log(err);
	}
};

export const tweetsService = {
	createTweet,
	getTweets,
	deleteTweet,
	likeTweet,
	unlikeTweet,
};
