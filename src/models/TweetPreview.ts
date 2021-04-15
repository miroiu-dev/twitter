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
	comments: number;
	likes: number;
	retweet: number;
};
