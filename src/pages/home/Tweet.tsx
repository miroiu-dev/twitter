import styled from '@emotion/styled/macro';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Activity,
	Block,
	Delete,
	Embed,
	Mute,
	NotInterseted,
	Pin,
	RemoveFromList,
	Report,
	Unfollow,
} from '../../components/icons/TweetModal';
import { ResponsiveImage } from '../../components/ResponsiveImage';
import { TweetInteractions } from './TweetInteraction';
import { TweetOption } from './TweetOptions';
import { GridRow, GridColumn } from './Atoms';
import { TweetPreview } from '../../models/TweetPreview';
import { useModal } from '../../hooks/useModal';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ConfirmDeletionModal } from '../../components/modals/ConfirmDeletionModal';
import { DotsSVG, IconWrapper } from '../../components/side-panel/Atoms';
import { getReadableDate } from '../../utils/getReadableDate';
const TweetModal = styled(motion.div)`
	position: absolute;
	width: 340px;
	z-index: 3;
	top: 0;
	pointer-events: all;
	left: -305px;
	background-color: #000;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
`;

const BaseTweetModalIcon = styled.svg`
	height: 1.25em;
	width: 1.25em;
`;

const NotInterestedSVG = BaseTweetModalIcon.withComponent(NotInterseted);
const UnfollowSVG = BaseTweetModalIcon.withComponent(Unfollow);
const RemoveFromListSVG = BaseTweetModalIcon.withComponent(RemoveFromList);
const MuteSVG = BaseTweetModalIcon.withComponent(Mute);
const BlockSVG = BaseTweetModalIcon.withComponent(Block);
const EmbedSVG = BaseTweetModalIcon.withComponent(Embed);
const ReportSVG = BaseTweetModalIcon.withComponent(Report);

const DeleteSVG = BaseTweetModalIcon.withComponent(Delete);
const PinSVG = BaseTweetModalIcon.withComponent(Pin);

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

const TweetContainer = styled.div`
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

const ActivitySVG = BaseTweetModalIcon.withComponent(Activity);

const SelftTweetModal = styled(TweetModal)``;

export const Tweet: React.FC<TweetPreview> = ({
	attachment,
	author,
	createdAt,
	message,
	numberOfComments,
	_id,
	retweet,
	likes,
}) => {
	const dateDiffDisplay = getReadableDate(new Date(createdAt));
	const { openModal, ref, show } = useModal();
	const [isOpen, setIsOpen] = useState(false);
	const closeDeletionModal = () => {
		setIsOpen(false);
	};
	const openDeletionModal = () => {
		setIsOpen(true);
	};
	const { user } = useAuth();

	return (
		<>
			{isOpen && (
				<ConfirmDeletionModal
					closeModal={closeDeletionModal}
					tweetId={_id}
				/>
			)}
			<TweetContainer>
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
									<AnimatePresence>
										{show && (
											<TweetModal
												ref={ref}
												initial={{
													height: '0px',
													opacity: 0,
												}}
												animate={{
													height: 'auto',
													opacity: 1,
												}}
											>
												<TweetOption
													icon={<NotInterestedSVG />}
													label="Not interested in this Tweet"
												></TweetOption>
												<TweetOption
													icon={<UnfollowSVG />}
													label={`Unfollow @${author.username}`}
												></TweetOption>
												<TweetOption
													icon={<RemoveFromListSVG />}
													label={`Add/remove @${author.username} from Lists`}
												></TweetOption>
												<TweetOption
													icon={<MuteSVG />}
													label={`Mute @${author.username}`}
												></TweetOption>
												<TweetOption
													icon={<BlockSVG />}
													label={`Block @${author.username}`}
												></TweetOption>{' '}
												<TweetOption
													icon={<EmbedSVG />}
													label="Embed Tweet"
												></TweetOption>{' '}
												<TweetOption
													icon={<ReportSVG />}
													label="Report Tweet"
												></TweetOption>
											</TweetModal>
										)}
									</AnimatePresence>
								) : (
									<AnimatePresence>
										{show && (
											<SelftTweetModal
												ref={ref}
												initial={{
													height: '0px',
													opacity: 0,
												}}
												animate={{
													height: 'auto',
													opacity: 1,
												}}
											>
												<TweetOption
													icon={<DeleteSVG />}
													label="Delete"
													color="rgb(224, 36, 94)"
													callback={openDeletionModal}
												></TweetOption>
												<TweetOption
													icon={<PinSVG />}
													label="Pin to your profile"
												></TweetOption>
												<TweetOption
													icon={<RemoveFromListSVG />}
													label={`Add/remove @${author.username} from Lists`}
												></TweetOption>
												<TweetOption
													icon={<EmbedSVG />}
													label="Embed Tweet"
												></TweetOption>
												<TweetOption
													icon={<ActivitySVG />}
													label="View Tweet activity"
												></TweetOption>
											</SelftTweetModal>
										)}
									</AnimatePresence>
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
							likes={likes}
							retweet={retweet}
							author={author}
						/>
					</GridRow>
				</GridColumn>
			</TweetContainer>
		</>
	);
};
