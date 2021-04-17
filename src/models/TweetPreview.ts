export type TweetPreview = {
	_id: string;
	author: {
		name: string;
		username: string;
		profilePicture: string;
	};
	createdAt: string;
	message: string;
	attachment: string;
	numberOfComments: number;
	numberOfLikes: number;
	numberOfRetweets: number;
	likedByUser: boolean;
	retweetedByUser: boolean;
};
