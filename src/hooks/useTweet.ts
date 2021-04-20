import { useCallback, useEffect, useRef, useState } from 'react';
import { Comment, FullTweet } from '../models/FullTweet';
import { commentsService } from '../services/comments.service';
import { tweetsService } from '../services/tweets.service';

const FETCH_COMMENTS_LIMIT = 10;

export const useTweet = (tweetId: string) => {
	const [tweet, setTweet] = useState<FullTweet>();
	const [comments, setComments] = useState<Comment[]>([]);
	const offsetRef = useRef(0);
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		tweetsService.getTweet(tweetId).then(t => {
			if (isMounted.current) {
				setTweet(t);
			}
		});
	}, [tweetId]);

	const fetchComments = useCallback(async () => {
		if (tweet) {
			const response = await tweetsService.getTweetComments(
				tweet._id,
				offsetRef.current,
				FETCH_COMMENTS_LIMIT
			);
			if (response && response.length > 0 && isMounted.current) {
				setComments(prev => [...prev!, ...response]);
				offsetRef.current = offsetRef.current + response.length;
			}
		}
	}, [tweet]);

	const toggleLike = async () => {
		if (tweet) {
			if (tweet.likedByUser) {
				await tweetsService.unlikeTweet(tweet._id);
			} else {
				await tweetsService.likeTweet(tweet._id);
			}
			if (tweet && isMounted.current) {
				setTweet({
					...tweet,
					numberOfLikes:
						tweet.numberOfLikes + (tweet.likedByUser ? -1 : 1),
					likedByUser: !tweet.likedByUser,
				});
			}
		}
	};

	const toggleRetweet = async () => {
		if (tweet) {
			if (tweet.retweetedByUser) {
				await tweetsService.unretweetTweet(tweet._id);
			} else {
				await tweetsService.retweetTweet(tweet._id);
			}
			if (isMounted.current) {
				setTweet({
					...tweet,
					numberOfRetweets:
						tweet.numberOfRetweets +
						(tweet.retweetedByUser ? -1 : 1),
					retweetedByUser: !tweet.retweetedByUser,
				});
			}
		}
	};

	const toggleCommentRetweet = async (id: string) => {
		const foundComment = comments.filter(t => t._id === id);
		if (foundComment.length > 0) {
			const comment = foundComment[0];
			if (comment.retweetedByUser) {
				await commentsService.unretweet(id);
			} else {
				await commentsService.retweet(id);
			}

			if (isMounted.current) {
				setComments(prev =>
					prev.map(comment =>
						comment._id === id
							? {
									...comment,
									numberOfRetweets:
										comment.numberOfRetweets +
										(comment.retweetedByUser ? -1 : 1),
									retweetedByUser: !comment.retweetedByUser,
							  }
							: comment
					)
				);
			}
		}
	};

	const toggleCommentLike = async (id: string) => {
		const foundComment = comments.filter(t => t._id === id);
		if (foundComment.length > 0) {
			const comment = foundComment[0];
			if (comment.likedByUser) {
				await commentsService.unlike(id);
			} else {
				await commentsService.like(id);
			}

			if (isMounted.current) {
				setComments(prev =>
					prev.map(comment =>
						comment._id === id
							? {
									...comment,
									numberOfLikes:
										comment.numberOfLikes +
										(comment.likedByUser ? -1 : 1),
									likedByUser: !comment.likedByUser,
							  }
							: comment
					)
				);
			}
		}
	};

	const createComment = async (message: string, attachment: string) => {
		const comment = await commentsService.createComment(
			tweetId,
			message,
			attachment
		);
		if (comment && isMounted.current) {
			setComments(prev => [comment, ...prev]);
			offsetRef.current += 1;
		}
	};

	const deleteComment = async (commentId: string) => {
		await commentsService.deleteComment(tweetId, commentId);
		if (isMounted.current) {
			setComments(prev => prev.filter(curr => curr._id !== commentId));
		}
	};
	return {
		tweet,
		comments,
		createComment,
		toggleLike,
		toggleRetweet,
		toggleCommentLike,
		toggleCommentRetweet,
		fetchComments,
		deleteComment,
	};
};
