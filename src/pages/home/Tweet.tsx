import styled from '@emotion/styled';

import { ResponsiveImage } from '../../components/ResponsiveImage';
import { TweetInteractions } from './TweetInteraction';
import { GridRow, GridColumn } from './Atoms';
import { TweetPreview } from '../../models/TweetPreview';
import { useModal } from '../../hooks/useModal';
import React, { useContext, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ConfirmDeletionModal } from '../../components/modals/ConfirmDeletionModal';
import { getReadableDate } from '../../utils/getReadableDate';

import { motion } from 'framer-motion';
import { TweetHeader } from './TweetHeader';
import { TweetsContext } from '../../hooks/TweetsContext';
import { useNavigate } from 'react-router-dom';

export const TweetContentWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 15px;
`;

export const TweetContent = styled.div`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 15px;
	font-family: inherit;
	margin: 0;
	white-space: pre-wrap !important; /* css-3 */
	white-space: -moz-pre-wrap !important; /* Mozilla */
	white-space: -pre-wrap !important; /* Opera 4-6 */
	white-space: -o-pre-wrap !important; /* Opera 7 */
	word-wrap: break-word !important; /* Internet Explorer 5.5+ */
`;

const TweetImage = styled(ResponsiveImage)`
	margin-top: 1rem;
`;

// const TweetContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	padding: 0 1rem;
// 	padding-top: 0.75rem;
// 	display: flex;
// 	&:hover {
// 		background-color: rgba(255, 255, 255, 0.03);
// 	}
// 	cursor: pointer;
// 	border-bottom: 1px solid rgb(47, 51, 54);
// `;

const TweetContainer = styled(motion.div)`
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
	@media (max-width: 320px) {
		padding: 0;
		padding-top: 1rem;
	}
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

export const Tweet: React.FC<TweetPreview> = ({
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
}) => {
	const dateDiffDisplay = getReadableDate(new Date(createdAt));
	const { closeModal, openModal, ref, show } = useModal();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};
	const { user } = useAuth();
	const { toggleLike, toggleRetweet } = useContext(TweetsContext);
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
			<TweetContainer
				variants={TweetVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				onClick={ev => {
					ev.stopPropagation();
					navigate(`/tweet/${_id}`);
				}}
			>
				<GridColumn>
					<UserImageWrapper>
						<UserImage
							draggable={false}
							src={author.profilePicture}
						/>
					</UserImageWrapper>

					<GridRow>
						<TweetHeader
							author={author}
							ref={ref}
							closeModal={closeModal}
							date={dateDiffDisplay}
							isShowing={show}
							openDeletionModal={openDeletionModal}
							openModal={openModal}
							user={user!}
						/>
						<TweetContentWrapper>
							<TweetContent>{message}</TweetContent>
						</TweetContentWrapper>
						{attachment && <TweetImage src={attachment} />}
						<TweetInteractions
							numberOfComments={numberOfComments}
							numberOfLikes={numberOfLikes}
							numberOfRetweets={numberOfRetweets}
							author={author}
							likedByUser={likedByUser}
							id={_id}
							retweetedByUser={retweetedByUser}
							toggleLike={toggleLike}
							toggleRetweet={toggleRetweet}
							createdAt={createdAt}
							message={message}
							tweetId={_id}
						/>
					</GridRow>
				</GridColumn>
			</TweetContainer>
		</>
	);
};
