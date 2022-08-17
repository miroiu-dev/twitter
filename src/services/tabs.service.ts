export type Person = {
	name: string;
	username: string;
	profilePicture: string;
};

export type Trends = {
	name: string;
	tweets: string;
};

const trendsForYou = async (): Promise<Trends[]> => {
	const trends = [
		{ name: 'Earth', tweets: '202K' },
		{ name: '#model', tweets: '8,417' },
		{ name: 'Ramadan', tweets: '1.6M' },
		{ name: '#buyARTPOPoniTunes', tweets: '177K' },
		{ name: 'China', tweets: '344K' },
	];
	return trends;
};

export type WhoToFollow = {
	profilePicture: string;
	name: string;
	username: string;
};

const whoToFollow = async (): Promise<WhoToFollow[]> => {
	const toFollow = [
		{
			profilePicture:
				'https://pbs.twimg.com/profile_images/1476332922701598720/37BJf5M2_200x200.jpg',
			name: 'SkinLords',
			username: 'SkinLords',
		},
		{
			profilePicture:
				'https://pbs.twimg.com/profile_images/1321134646202163203/TSy_Bp9F_normal.jpg',
			name: 'Snugtoes - Lukas',
			username: 'IdleHeroesTT',
		},
		{
			profilePicture:
				'https://pbs.twimg.com/profile_images/1017199814667218944/M3ajAMM5_normal.jpg',
			name: 'Kuang',
			username: 'KuangTV',
		},
	];

	return toFollow;
};

export type TopicsToFollow = {
	title: string;
	category: string;
};

const topicsToFollow = async (): Promise<TopicsToFollow[]> => {
	const topics = [
		{ title: 'Among Us', category: 'Video Game' },
		{ title: 'Roblox', category: 'Video Game' },
		{ title: 'Call of Duty', category: 'Video Game' },
		{ title: 'Nintendo', category: 'Game developers and publisher' },
		{
			title: "Five Nights at Freddy's",
			category: 'Video Game',
		},
	];

	return topics;
};

export const tabsService = {
	trendsForYou,
	whoToFollow,
	topicsToFollow,
};
