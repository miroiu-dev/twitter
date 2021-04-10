const baseURL = process.env.TWITTER_API_URL || 'http://localhost:3001';

export const routes = {
	login: () => `${baseURL}/login`,
};
