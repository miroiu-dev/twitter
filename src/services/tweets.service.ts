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
	totalTweets: number;
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

const retweetTweet = async (id: string) => {
	try {
		const response = await axios.put(
			routes.retweets(id),
			{},
			{ withCredentials: true }
		);
		console.log(response.status);
	} catch (err) {
		console.log(err);
	}
};

const unretweetTweet = async (id: string) => {
	try {
		const response = await axios.delete(routes.retweets(id), {
			withCredentials: true,
		});
		console.log(response.status);
	} catch (err) {
		console.log(err);
	}
};

const getTweet = async (id: string) => {
	try {
		const response = await axios.get(routes.getTweet(id), {
			withCredentials: true,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getTweetComments = async (id: string, offset: number, limit: number) => {
	try {
		const response = await axios.get(
			routes.getTweetComments(id, offset, limit),
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
	deleteTweet,
	likeTweet,
	unlikeTweet,
	retweetTweet,
	unretweetTweet,
	getTweet,
	getTweetComments,
};
