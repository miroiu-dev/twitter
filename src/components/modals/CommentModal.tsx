import styled from '@emotion/styled/macro';
import { createPortal } from 'react-dom';
import { useModalScrollbar } from '../../hooks/useModalScrollbar';
import { CreateTweet } from '../../pages/home/CreateTweet';
import { TweetHeader } from '../../pages/home/TweetHeader';
import { getReadableDate } from '../../utils/getReadableDate';
import { CloseX } from '../icons/CloseX';
import { ResponsiveImage } from '../ResponsiveImage';
import { IconWrapper } from '../side-panel/Atoms';

const ModalWrapper = styled.div`
	background-color: rgba(91, 112, 131, 0.4);
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	z-index: 10;
	display: flex;
	justify-content: center;
	position: fixed;
`;

const WrapperTop = styled.div`
	height: 53px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
	background-color: #000;
`;

const Modal = styled.div`
	background-color: #000;
	position: absolute;
	top: 5%;
	max-width: 600px;
	width: 100%;
	border-radius: 1rem;
	padding: 0 1rem;
`;

const CloseXSVG = styled(CloseX)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
	font-size: 0.938rem;
`;

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
`;

const TweetImage = styled(ResponsiveImage)`
	margin-top: 1rem;
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
	reference: React.MutableRefObject<HTMLDivElement | null>;
	closeModal: () => void;
};

export const CommentModal: React.FC<CommentModalProps> = ({
	author,
	message,
	createdAt,
	reference,
	closeModal,
}) => {
	const query = document.getElementById('modal-root');
	const dateDiffDisplay = getReadableDate(new Date(createdAt));
	useModalScrollbar();
	return createPortal(
		<ModalWrapper>
			<Modal ref={reference}>
				<WrapperTop>
					<IconWrapper onClick={closeModal}>
						<CloseXSVG />
					</IconWrapper>
				</WrapperTop>
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
					contentPadding="0 0"
					visibilityHidden
					inputMinHeight="96px"
					buttonName="Reply"
					hideBorderBottom
				/>
			</Modal>
		</ModalWrapper>,
		query!
	);
};
