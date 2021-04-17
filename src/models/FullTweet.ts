type Comment = {
	_id?: string;
	author: {
		name: string;
		username: string;
		profilePicture?: string;
	};
	message: string;
	numberOfLikes: number;
	numberOfRetweets: number;
	createdAt: Date;
};

export type FullTweet = {
	_id?: string;
	author: {
		id?: string;
		name: string;
		username: string;
		profilePicture?: string;
	};
	createdAt: Date;
	message: string;
	attachment?: string;
	comments?: Comment[];
	numberOfComments: number;
	numberOfLikes: number;
	numberOfRetweets: number;
	likedByUser: boolean;
	retweetedByUser: boolean;
};
