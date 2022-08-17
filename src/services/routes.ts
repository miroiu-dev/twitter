const baseURL = import.meta.env.VITE_TWITTER_API_URL;

export const routes = {
	login: () => `${baseURL}/login`,
	logout: () => `${baseURL}/logout`,
	signup: () => `${baseURL}/signup`,
	people: (text: string, count: number = 10) =>
		`${baseURL}/people?filter=${text}&count=${count}`,
	tweets: () => `${baseURL}/tweets`,
	fetchTweets: (offset: number, limit: number) =>
		`${baseURL}/tweets?offset=${offset}&limit=${limit}`,
	likes: (id: string) => `${baseURL}/tweets/${id}/likes`,
	retweets: (id: string) => `${baseURL}/tweets/${id}/retweets`,
	getTweet: (id: string) => `${baseURL}/tweets/${id}`,
	getTweetComments: (id: string, offset: number, limit: number) =>
		`${baseURL}/tweets/${id}/comments?offset=${offset}&limit=${limit}`,
	toggleCommentLike: (id: string) => `${baseURL}/tweets/comments/${id}/likes`,
	toggleCommentRetweet: (id: string) =>
		`${baseURL}/tweets/comments/${id}/retweets`,
	creatComment: (id: string) => `${baseURL}/tweets/${id}/comments`,
	deleteComment: (tweetId: string, commentId: string) =>
		`${baseURL}/tweets/${tweetId}/comments/${commentId}`,
};
