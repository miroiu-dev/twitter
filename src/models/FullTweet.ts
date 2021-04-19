export type Comment = {
	_id?: string;
	author: {
		name: string;
		username: string;
		profilePicture?: string;
	};
	message: string;
	numberOfLikes: number;
	numberOfRetweets: number;
	numberOfComments?: number;
	createdAt: string;
	attachment?: string;
	likedByUser?: boolean;
	retweetedByUser?: boolean;
};

export type FullTweet = {
	_id: string;
	author: {
		id?: string;
		name: string;
		username: string;
		profilePicture?: string;
	};
	createdAt: string;
	message: string;
	attachment?: string;
	comments?: Comment[];
	numberOfComments: number;
	numberOfLikes: number;
	numberOfRetweets: number;
	likedByUser: boolean;
	retweetedByUser: boolean;
};
