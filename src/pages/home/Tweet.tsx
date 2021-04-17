import styled from '@emotion/styled/macro';

import { ResponsiveImage } from '../../components/ResponsiveImage';
import { TweetInteractions } from './TweetInteraction';
import { GridRow, GridColumn } from './Atoms';
import { TweetPreview } from '../../models/TweetPreview';
import { useModal } from '../../hooks/useModal';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ConfirmDeletionModal } from '../../components/modals/ConfirmDeletionModal';
import { DotsSVG, IconWrapper } from '../../components/side-panel/Atoms';
import { getReadableDate } from '../../utils/getReadableDate';
import {
	TweetOptionsModalSelf,
	TweetOptionsModalUser,
} from './TweetOptionsModal';
import { motion } from 'framer-motion';

const Wrapper = styled(IconWrapper)`
	margin-top: -7px;
`;

const Name = styled.span`
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
	margin-right: 5px;
`;

const FlexRow = styled.div`
	display: flex;
	&:hover ${Name} {
		text-decoration: underline;
	}
`;

const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-right: 5px;
`;
const HeightWrapper = styled.div`
	height: 20px;
	position: relative;
`;
const TweetDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
`;

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

const TweetHeader = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	height: 22px;
	margin-bottom: 2px;
`;
const FlexContainer = styled.div`
	display: flex;
	:hover {
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
			>
				<GridColumn>
					<UserImageWrapper>
						<UserImage
							draggable={false}
							src={author.profilePicture}
						/>
					</UserImageWrapper>

					<GridRow>
						<TweetHeader>
							<FlexContainer>
								<FlexRow>
									<Name>{author.name}</Name>
									<Username>@{author.username}</Username>
								</FlexRow>
								<TweetDate> · {dateDiffDisplay}</TweetDate>
							</FlexContainer>
							<HeightWrapper>
								<Wrapper onClick={openModal}>
									<DotsSVG></DotsSVG>
								</Wrapper>
								{author.username !== user!.username ? (
									<TweetOptionsModalUser
										author={author}
										reference={ref}
										show={show}
									/>
								) : (
									<TweetOptionsModalSelf
										author={author}
										reference={ref}
										show={show}
										callback={openDeletionModal}
										secondaryCallback={closeModal}
									/>
								)}
							</HeightWrapper>
						</TweetHeader>
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
