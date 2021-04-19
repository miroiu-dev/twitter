import axios from 'axios';
import { Comment } from '../models/FullTweet';
import { routes } from './routes';

const like = async (id: string) => {
	try {
		await axios.put(
			routes.toggleCommentLike(id),
			{},
			{ withCredentials: true }
		);
	} catch (err) {
		console.log(err);
	}
};

const unlike = async (id: string) => {
	try {
		await axios.delete(routes.toggleCommentLike(id), {
			withCredentials: true,
		});
	} catch (err) {
		console.log(err);
	}
};

const retweet = async (id: string) => {
	try {
		await axios.put(
			routes.toggleCommentRetweet(id),
			{},
			{ withCredentials: true }
		);
	} catch (err) {
		console.log(err);
	}
};

const unretweet = async (id: string) => {
	try {
		await axios.delete(routes.toggleCommentLike(id), {
			withCredentials: true,
		});
	} catch (err) {
		console.log(err);
	}
};

const createComment = async (
	id: string,
	message: string,
	attachment: string
) => {
	try {
		const response = await axios.put<Comment>(
			routes.creatComment(id),
			{ message: message, attachment: attachment },
			{ withCredentials: true }
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteComment = async (tweetId: string, commentId: string) => {
	try {
		await axios.delete(routes.deleteComment(tweetId, commentId), {
			withCredentials: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export const commentsService = {
	like,
	unlike,
	retweet,
	unretweet,
	createComment,
	deleteComment,
};
