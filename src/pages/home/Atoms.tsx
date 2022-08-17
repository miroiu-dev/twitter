import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Lists } from '../../components/icons/Lists';
import { Profile } from '../../components/icons/Profile';
import { RemoveImage } from '../../components/icons/RemoveImage';
import {
	Calendar,
	Emoji,
	Poll,
	UploadGIF,
	UploadImage,
} from '../../components/icons/TweetOptions';
import { Everyone } from '../../components/icons/WhoCanReply';

export const CreateTweetWrapper = styled.div<{ hideBorderBottom?: boolean }>`
	padding: 4px 0;
	border-bottom: ${props =>
		!props.hideBorderBottom && '1px solid rgb(47, 51, 54)'};
`;

export const CreateTweetContent = styled.div<{ contentPadding?: string }>`
	display: flex;
	flex-direction: column;
	padding: ${props => props.contentPadding || '0 1rem'};
`;

export const ProfilePictureWrapper = styled(Link)`
	display: flex;
	height: 48px;
	padding-top: 4px;
	margin-right: 0.75rem;
	transition: 200ms;
	&:hover {
		filter: brightness(0.8);
	}
`;

export const ProfilePicture = styled.img`
	height: 48px;
	border-radius: 9999px;
`;

export const TweetInputWrapper = styled.div`
	padding: 0.75rem 0;
	flex-grow: 1;
	overflow-y: auto;
`;

export const GridColumn = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
`;

export const GridRow = styled.div`
	display: grid;
`;

export const TweetInput = styled.div<{
	inputMinHeight?: string;
	shouldNotKeepMinHeight?: boolean;
}>`
	font-size: 1.25rem;
	max-height: 720px;

	min-height: ${props =>
		!props.shouldNotKeepMinHeight && (props.inputMinHeight || '24px')};

	font-weight: 400;
	color: rgb(217, 217, 217);
	padding-bottom: 2px;
	padding-top: 2px;
	background-color: #000;

	outline: none;
	word-wrap: break-word;
	cursor: text;
	&:empty:before {
		content: attr(data-placeholder);
		color: #6e767d;
	}
	white-space: pre-line !important;
`;

export const BaseIcon = styled.svg`
	fill: rgba(29, 161, 242, 1);
	width: 1.5em;
	height: 1.5em;
`;

export const UploadImageIcon = BaseIcon.withComponent(UploadImage);
export const UploadGIFIcon = BaseIcon.withComponent(UploadGIF);
export const PollIcon = BaseIcon.withComponent(Poll);
export const EmojiIcon = BaseIcon.withComponent(Emoji);
export const CalendarIcon = BaseIcon.withComponent(Calendar);

export const TweetOptionsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.75rem;
	margin-bottom: 5px;
	margin-left: -12px;
	@media (max-width: 320px) {
		margin-left: -55px;
	}
`;
export const TweetOptions = styled.div`
	display: flex;
`;

export const TweetButton = styled.button`
	background-color: rgb(29, 161, 242);
	margin-left: 0.75rem;

	min-width: 80.4px;
	min-height: 40px;
	outline-style: none;
	transition-duration: 0.2s;
	border: none;
	border-radius: 9999px;
	color: rgb(255, 255, 255);
	font-weight: 700;
	font-size: 0.938rem;
	cursor: pointer;

	&:hover:not(:disabled) {
		background-color: rgb(26, 145, 218);
	}
	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;
export const VisiblityWrapper = styled.div`
	padding-bottom: 0.75rem;
	border-bottom: 1px solid rgb(47, 51, 54);
`;

export const VisibilityContent = styled.div`
	min-height: 32px;
	display: flex;
	align-items: center;
	transition: 200ms;
	padding: 0 4px;
	border-radius: 9999px;
	width: fit-content;
	cursor: pointer;
	user-select: none;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
`;

export const Visbility = styled.span`
	font-weight: 700;
	line-height: 1rem;
	font-size: 0.813rem;
	color: rgba(29, 161, 242, 1);
`;

export const EveryoneSVG = styled(Everyone)`
	margin-right: 0.5em;
	width: 1.3em;
	height: 1.3em;
	fill: rgba(29, 161, 242, 1);
`;

export const UploadedImage = styled.div`
	display: flex;
	flex-direction: column;
	margin: 4px 0;
	user-select: none;
`;

export const Controls = styled.div`
	position: absolute;
	display: flex;
	width: 100%;
`;
export const RemoveSVG = styled(RemoveImage)`
	width: 1.5em;
	font-size: 13px;
	fill: rgb(255, 255, 255);
`;

export const RemoveSVGWrapper = styled.div`
	position: absolute;
	background-color: rgba(0, 0, 0, 0.77);
	border-radius: 50%;
	padding: 0.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 200ms;
	cursor: pointer;
	top: 4px;
	left: 4px;
	&:hover {
		background-color: rgba(26, 26, 26, 0.77);
	}
`;

export const EditWrapper = styled.div`
	position: absolute;
	transition: 200ms;
	background-color: rgba(0, 0, 0, 0.77);
	border-radius: 9999px;
	padding: 0.4rem;
	color: rgb(255, 255, 255);
	font-weight: 700;
	font-size: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	right: 4px;
	top: 4px;
	min-width: 60px;
	&:hover {
		background-color: rgba(26, 26, 26, 0.77);
	}
`;

export const Options = styled.div`
	display: flex;
	margin-top: 8px;
	margin-bottom: 8px;
`;

export const PersonSVG = styled(Profile)`
	margin-right: 2px;
	height: 1.25em;
	fill: rgb(110, 118, 125);
`;

export const ListSVG = styled(Lists)`
	margin-right: 2px;
	height: 1.25em;
	fill: rgb(110, 118, 125);
`;

export const OptionTitle = styled.span`
	font-size: 0.813rem;
	color: rgb(110, 118, 125);
	margin-right: 48px;
	@media (max-width: 320px) {
		margin-right: 0;
	}
`;

export const OptionWrapper = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	&:hover ${OptionTitle} {
		text-decoration: underline;
	}
`;
