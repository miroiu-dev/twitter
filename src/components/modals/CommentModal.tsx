import styled from '@emotion/styled';
import { useContext } from 'react';
import { TweetsContext } from '../../hooks/TweetsContext';
import { CreateTweet } from '../../pages/home/CreateTweet';
import { TweetHeader } from '../../pages/home/TweetHeader';
import { getReadableDate } from '../../utils/getReadableDate';
import { TwitterModal } from './TwitterModal';

export const GridColumn = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	padding-top: 0.75rem;
`;

export const GridRow = styled.div`
	display: grid;
`;

const UserImageWrapper = styled.div`
	margin-right: 12px;
	display: grid;
	grid-template-rows: auto 1fr;
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

export const TweetContentWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 15px;
`;

export const TweetContent = styled.pre`
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

const InitialComment = styled.div``;

const ReplyingToWrapper = styled.div`
	padding: 1rem 0;
	font-weight: 400;
	font-size: 0.938rem;
	cursor: pointer;
`;

const Replying = styled.span`
	color: rgb(110, 118, 125);
`;

const ToUser = styled.span`
	color: rgb(27, 149, 224);
`;

const Bar = styled.div`
	margin-top: 8px;
`;

const Line = styled.div`
	height: 100%;
	width: 2px;
	background-color: rgb(47, 51, 54);
	margin: 0 auto;
`;

type CommentModalProps = {
	author: {
		id?: string;
		name: string;
		username: string;
		profilePicture?: string;
	};
	createdAt: string;
	message: string;
	onClose: () => void;
	onReply: (message: string, attachement: string) => void;
	isOpen: boolean;
	tweetId: string;
};

export const CommentModal: React.FC<CommentModalProps> = ({
	author,
	message,
	createdAt,
	isOpen,
	onClose,
	onReply,
	tweetId,
}) => {
	const dateDiffDisplay = getReadableDate(new Date(createdAt));
	const { updateCommentCount } = useContext(TweetsContext);
	return (
		<TwitterModal isOpen={isOpen} onClose={onClose}>
			<InitialComment>
				<GridColumn>
					<UserImageWrapper>
						<UserImage
							draggable={false}
							src={author.profilePicture}
						/>
						<Bar>
							<Line></Line>
						</Bar>
					</UserImageWrapper>
					<GridRow>
						<TweetHeader
							author={author}
							date={dateDiffDisplay}
							hideButton
						/>
						<TweetContentWrapper>
							<TweetContent>{message}</TweetContent>
						</TweetContentWrapper>
						<ReplyingToWrapper>
							<Replying>
								Replying to
								<ToUser>{' @' + author.username}</ToUser>
							</Replying>
						</ReplyingToWrapper>
					</GridRow>
				</GridColumn>
			</InitialComment>
			<CreateTweet
				callback={(a, m) => {
					updateCommentCount(tweetId);
					onReply(a, m);
					onClose();
				}}
				contentPadding="0 0"
				visibilityHidden
				inputMinHeight="96px"
				buttonName="Reply"
				hideBorderBottom
			/>
		</TwitterModal>
	);
};
