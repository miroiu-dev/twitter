import styled from '@emotion/styled/macro';

import { ResponsiveImage } from '../../components/ResponsiveImage';
import { TweetInteractions } from './TweetInteraction';
import { GridRow, GridColumn } from './Atoms';
import { TweetPreview } from '../../models/TweetPreview';
import { useModal } from '../../hooks/useModal';
import React, { memo, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ConfirmDeletionModal } from '../../components/modals/ConfirmDeletionModal';
import { getReadableDate } from '../../utils/getReadableDate';

import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import { TweetHeader } from './TweetHeader';

const TweetContentWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	color: #fff;
	font-weight: 400;
	font-size: 15px;
`;

const TweetContent = styled.pre`
	display: flex;
	flex-grow: 1;
	color: #fff;
	font-weight: 400;
	font-size: 15px;
	font-family: inherit;
	margin: 0;
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
	const history = useHistory();
	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};
	const { user } = useAuth();

	const TweetVariants = {
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

	return (
		<>
			{isOpen && (
				<ConfirmDeletionModal
					closeModal={closeDeletionModal}
					tweetId={_id}
				/>
			)}
			<TweetContainer
				variants={TweetVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				onClick={ev => {
					ev.stopPropagation();
					history.push(`/tweet/${_id}`);
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
							reference={ref}
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
						{attachment && (
							<TweetImage src={attachment}></TweetImage>
						)}
						<TweetInteractions
							numberOfComments={numberOfComments}
							numberOfLikes={numberOfLikes}
							numberOfRetweets={numberOfRetweets}
							author={author}
							likedByUser={likedByUser}
							id={_id}
							retweetedByUser={retweetedByUser}
						/>
					</GridRow>
				</GridColumn>
			</TweetContainer>
		</>
	);
};
