import styled from '@emotion/styled';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Arrow } from '../../../components/icons/Arrow';
import {
	Comment,
	Heart,
	Retweet,
	RetweetFilled,
	Share,
} from '../../../components/icons/TweetInteraction';
import { Activity } from '../../../components/icons/TweetModal';
import { ResponsiveImage } from '../../../components/ResponsiveImage';
import { Container } from '../../../components/user/Atoms';
import { IconHover } from '../TweetInteraction';

export const TweetWrapper = styled.div`
	max-width: 600px;
	width: 100%;
	border-left: 1px solid rgb(47, 51, 54);
	border-right: 1px solid rgb(47, 51, 54);
`;
export const Header = styled.div`
	height: 53px;
	padding: 0 1rem;
	background: #000;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
	position: sticky;
	top: 0;
	z-index: 4;
`;

export const Icon = styled(Arrow)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
`;

export const Title = styled.span`
	font-weight: 800;
	font-size: 1.25rem;
	color: rgb(217, 217, 217);
	text-decoration: none;
	margin-left: 1.5rem;
	cursor: pointer;
`;

export const TweetDataWrapper = styled.div`
	cursor: pointer;
	padding: 0.75rem 1rem;
	padding-bottom: 0;
`;

export const FlexRow = styled.div`
	display: flex;
`;
export const FlexRowJustifyContent = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
`;
export const ProfileImageWrapper = styled.div`
	margin-right: 12px;
`;
export const ProfileImage = styled.img`
	border-radius: 9999px;
	width: 48px;
	height: 48px;
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
	font-size: 1.438rem;
	line-height: 28px;
	font-family: inherit;
	margin-top: 12px;
	cursor: text;
`;

export const TweetContent = styled.pre`
	display: flex;
	flex-grow: 1;
	color: rgb(217, 217, 217);
	font-weight: 400;
	font-size: 1.438rem;
	line-height: 28px;
	font-family: inherit;
	margin: 0;
	white-space: pre-wrap !important; /* css-3 */
	white-space: -moz-pre-wrap !important; /* Mozilla */
	white-space: -pre-wrap !important; /* Opera 4-6 */
	white-space: -o-pre-wrap !important; /* Opera 7 */
	word-wrap: break-word !important; /* Internet Explorer 5.5+ */
`;

export const TweetImage = styled(ResponsiveImage)`
	margin-top: 1rem;
`;

export const DateBar = styled.div`
	margin: 1rem 0;
	display: flex;
	cursor: default;
`;

export const CreatedAtDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 15px;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

export const Platform = styled(CreatedAtDate)`
	margin-left: 5px;
`;

export const Dot = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-left: 5px;
	cursor: pointer;
`;

export const ViewActivityWrapper = styled.div`
	display: flex;
	border-top: 1px solid rgb(47, 51, 54);
	cursor: pointer;
	padding: 1rem 0;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

export const ViewActivitySVG = styled(Activity)`
	padding-right: 4px;
	fill: rgb(110, 118, 125);
	height: 1.25em;
	width: 1.25em;
	margin-right: 5px;
`;

export const ViewActivityLabel = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	cursor: pointer;
`;

export const TweetInteractionsWrapper = styled.div`
	height: 48px;
	display: flex;
	justify-content: space-around;
	border-top: 1px solid rgb(47, 51, 54);
	align-items: center;
`;

export const BaseIcon = styled.svg`
	width: 1.5em;
	height: 1.5em;
	fill: rgb(110, 118, 125);
`;

export const CommentSVG = BaseIcon.withComponent(Comment);

export const CommentWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${CommentSVG} {
		fill: rgba(29, 161, 242, 1);
	}
`;

export const RetweetFilledSVG = BaseIcon.withComponent(RetweetFilled);

export const RetweetSVG = BaseIcon.withComponent(Retweet);

export const HeartSVG = BaseIcon.withComponent(Heart);

export const RetweetWrapper = styled(Container)<{ retweeted?: boolean }>`
	position: relative;
	&:hover ${IconHover} {
		background-color: rgba(23, 191, 99, 0.1);
	}
	&:hover ${RetweetSVG} {
		fill: rgb(23, 191, 99);
	}

	&:hover ${RetweetFilledSVG} {
		fill: rgb(23, 191, 99);
	}

	${RetweetFilledSVG} {
		fill: ${props => props.retweeted && 'rgb(23, 191, 99);'};
	}
`;

export const IconHoverAnimated = styled(IconHover)`
	padding: 0;
	width: 40px;
	height: 40px;
`;

export const HeartWrapper = styled(Container)<{ liked?: boolean }>`
	&:hover ${IconHover} {
		background-color: rgba(224, 36, 94, 0.1);
	}
	&:hover ${HeartSVG} {
		fill: rgb(224, 36, 94);
	}

	&:hover ${IconHoverAnimated} {
		background-color: rgba(224, 36, 94, 0.1);
	}
`;

export const ShareSVG = BaseIcon.withComponent(Share);

export const ShareWrapper = styled(Container)`
	&:hover ${IconHover} {
		background-color: rgba(29, 161, 242, 0.1);
	}
	&:hover ${ShareSVG} {
		fill: rgba(29, 161, 242, 1);
	}
`;

export const Ammounts = styled.div`
	display: flex;
	padding: 1rem 4px;
	border-top: 1px solid rgb(47, 51, 54);
`;

export const AmmountWrapper = styled.div`
	display: flex;
	margin-right: 20px;
`;

export const Ammount = styled.span`
	font-weight: 700;
	font-size: 15px;
	color: rgb(217, 217, 217);
	margin-right: 4px;
`;

export const AmmountLabel = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 15px;
`;

export const InfiniteScrolling = styled(InfiniteScroll)`
	overflow: hidden !important;
`;

export type Author = {
	id?: string;
	name: string;
	username: string;
	profilePicture?: string;
};

export const Border = styled.div`
	width: 100%;
	height: 1px;
	background-color: rgb(47, 51, 54);
`;
