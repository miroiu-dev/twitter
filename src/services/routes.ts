const baseURL = process.env.TWITTER_API_URL || 'http://localhost:3001';

export const routes = {
	login: () => `${baseURL}/login`,
	logout: () => `${baseURL}/logout`,
	signup: () => `${baseURL}/signup`,
	people: (text: string, count: number = 10) =>
		`${baseURL}/people?filter=${text}&count=${count}`,
	tweets: () => `${baseURL}/tweets`,
	fetchTweets: (offset: number, limit: number) =>
		`${baseURL}/tweets?offset=${offset}&limit=${limit}`,
};
