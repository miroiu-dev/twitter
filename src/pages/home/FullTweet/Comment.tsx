import styled from '@emotion/styled/macro';

import { ResponsiveImage } from '../../../components/ResponsiveImage';
import { TweetInteractions as CommentInteractions } from '../TweetInteraction';
import { GridRow, GridColumn } from '../Atoms';
import { useModal } from '../../../hooks/useModal';
import { useContext, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ConfirmDeletionModal } from '../../../components/modals/ConfirmDeletionModal';
import { getReadableDate } from '../../../utils/getReadableDate';

import { motion } from 'framer-motion';
import { TweetHeader as CommentHeader } from '../TweetHeader';
import { TweetsContext } from '../../../hooks/TweetsContext';
import { Comment as CommentModel } from '../../../models/FullTweet';

export const CommentWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 15px;
`;

export const CommentContent = styled.pre`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 15px;
	font-family: inherit;
	margin: 0;
`;

const CommentImage = styled(ResponsiveImage)`
	margin-top: 1rem;
`;

const CommentContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
	padding-top: 0.75rem;
	display: flex;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
	cursor: pointer;
	border-bottom: 1px solid rgb(47, 51, 54);
`;

const UserImageWrapper = styled.div`
	margin-right: 12px;
`;
const UserImage = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 9999px;
	transition: 200ms;
	&:hover {
		filter: brightness(0.8);
	}
`;

export const TweetVariants = {
	initial: {
		opacity: 0.5,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		height: 0,
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
};

export const Comment: React.FC<
	CommentModel & {
		toggleCommentRetweet: (id: string) => void;
		toggleCommentLike: (id: string) => void;
	}
> = ({
	attachment,
	author,
	createdAt,
	message,
	numberOfComments,
	_id,
	numberOfRetweets,
	numberOfLikes,
	likedByUser,
	retweetedByUser,
	toggleCommentRetweet,
	toggleCommentLike,
}) => {
	const dateDiffDisplay = getReadableDate(new Date(createdAt));
	const { closeModal, openModal, ref, show } = useModal();
	const [isOpen, setIsOpen] = useState(false);
	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};
	const { user } = useAuth();
	const { deleteTweet } = useContext(TweetsContext);

	return (
		<>
			{isOpen && (
				<ConfirmDeletionModal
					closeModal={closeDeletionModal}
					onDelete={deleteTweet}
					id={_id}
				/>
			)}
			<CommentContainer
				variants={TweetVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<GridColumn>
					<UserImageWrapper>
						<UserImage
							draggable={false}
							src={author.profilePicture}
						/>
					</UserImageWrapper>

					<GridRow>
						<CommentHeader
							author={author}
							ref={ref}
							closeModal={closeModal}
							date={dateDiffDisplay}
							isShowing={show}
							openDeletionModal={openDeletionModal}
							openModal={openModal}
							user={user!}
						/>
						<CommentWrapper>
							<CommentContent>{message}</CommentContent>
						</CommentWrapper>
						{attachment && (
							<CommentImage src={attachment}></CommentImage>
						)}
						<CommentInteractions
							numberOfComments={numberOfComments!}
							numberOfLikes={numberOfLikes}
							numberOfRetweets={numberOfRetweets}
							author={author}
							likedByUser={likedByUser!}
							id={_id!}
							retweetedByUser={retweetedByUser!}
							toggleLike={toggleCommentLike}
							toggleRetweet={toggleCommentRetweet}
						/>
					</GridRow>
				</GridColumn>
			</CommentContainer>
		</>
	);
};
