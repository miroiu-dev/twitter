import styled from '@emotion/styled';
import { Dots } from '../icons/Dots';
import { Remove } from '../icons/Remove';
import { Search } from '../icons/Search';
import { SettingsWheel } from '../icons/SettingsWheel';

export const DotsSVG = styled(Dots)`
	width: 1.25em;
	height: 1.25em;
	fill: rgb(110, 118, 125);
	font-size: 0.938rem;
`;

export const TrendsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	transition: 200ms;
	padding: 0.75rem 1rem;
	padding-right: 0.625rem;
	border-bottom: 1px solid;
	border-bottom-color: rgb(47, 51, 54);
	cursor: pointer;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

export const Trends = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Tweets = styled.span`
	margin-top: 4px;
	font-size: 0.813rem;
	font-weight: 400;
	color: rgb(110, 118, 125);
`;

export const Name = styled.span`
	padding-top: 2px;
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
`;

export const Category = styled.span`
	line-height: 1rem;
	font-size: 0.813rem;
	color: rgb(110, 118, 125);
	font-weight: 400;
	display: flex;
	align-items: center;
`;
export const Wrapper = styled.div`
	height: 1.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2px;
`;
export const IconWrapper = styled.div<{ padding?: string }>`
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${props => props.padding ?? '0.5rem'};
	border-radius: 50%;
	cursor: pointer;
	transition: 200ms;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
`;

export const SidePanelWrapper = styled.div`
	width: 350px;
	margin-left: 1.875rem;
	position: sticky;
	top: 0;
`;

export const Settings = styled(SettingsWheel)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
`;

export const TrendingTab = styled.div`
	background-color: rgb(21, 24, 28);
	border: 1px solid rgb(21, 24, 28);
	border-radius: 1rem;
	margin-bottom: 1rem;
	margin-top: 0.75rem;
`;
export const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	color: #fff;
	border-bottom: 1px solid;
	border-bottom-color: rgb(47, 51, 54);
	padding: 0.75rem 1rem;
	position: relative;
`;
export const Title = styled.span`
	font-weight: 800;
	font-size: 1.25rem;
	color: rgb(217, 217, 217);
	line-height: 24px;
`;

export const SearchBar = styled.input`
	width: 100%;
	background-color: rgb(32, 35, 39);
	border: none;
	box-sizing: border-box;
	color: rgb(110, 118, 125);
	outline: none;
	font-size: 0.938rem;
	font-weight: 400;
	cursor: text;
	pointer-events: all;
`;

export const SearchIcon = styled(Search)`
	padding-left: 0.75rem;
	fill: rgb(110, 118, 125);
	min-width: 32px;
	user-select: none;
	height: 1.25em;
`;

export const SearchBarWrapper = styled.div`
	background-color: rgb(32, 35, 39);
	border-radius: 9999px;
	display: flex;
	box-sizing: border-box;
	border: 1px solid rgb(32, 35, 39);

	&:focus-within {
		border: 1px solid rgb(29, 161, 242);
		background-color: #000;
	}
	&:focus-within ${SearchBar} {
		background-color: #000;
	}
	&:focus-within ${SearchIcon} {
		fill: rgb(29, 161, 242);
	}
`;
export const SearchIconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SearchBarContainer = styled.div`
	width: 100%;
	padding: 0.75rem;
`;

export const Container = styled.div`
	position: relative;
	pointer-events: all !important;
	position: sticky;
	top: 0;
	padding: 4px 0;
	z-index: 4;
	background-color: #000;
`;

export const TrySearching = styled.span`
	padding: 1.25rem;
	color: rgb(110, 118, 125);
	font-size: 15px;
	font-weight: 400;
	height: fit-content;
`;

export const SearchResults = styled.div`
	position: absolute;
	min-height: 100px;
	max-height: calc(80vh - 53px);
	width: 100%;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
	overflow-y: auto;
	background-color: #000;
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	z-index: 2;
`;

export const Results = styled.div`
	display: flex;
	flex-direction: column;
`;
export const Result = styled.div`
	display: flex;
	padding: 0.75rem 1rem;
	cursor: pointer;

	transition: 200ms;
	&:hover {
		background-color: rgb(21, 24, 28);
	}
	border-bottom: 1px solid rgb(47, 51, 54);
`;

export const Footer = styled.div`
	padding: 1rem;
	cursor: pointer;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;
export const More = styled.span`
	font-weight: 400;
	font-size: 0.938rem;
	color: rgba(29, 161, 242, 1);
`;

export const PossibleFollowerWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid rgb(47, 51, 54);
	transition: 200ms;
	padding: 0.75rem 1rem;
	cursor: pointer;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

export const ProfileWrapper = styled.div`
	display: flex;
	justify-content: center;
	user-select: none;
`;

export const RemoveSVG = styled(Remove)`
	fill: rgb(110, 118, 125);
	width: 1.5em;
	height: 1.5em;
`;

export const TopicWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	transition: 200ms;
	padding: 0.75rem 1rem;
	border-bottom: 1px solid rgb(47, 51, 54);
	cursor: pointer;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

export const FlexContainer = styled.div<{ flexDirection?: string }>`
	display: flex;
	flex-direction: ${props => props.flexDirection ?? 'row'};
`;

export const TopicName = styled.span`
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
	&:hover {
		text-decoration: underline;
	}
`;
export const TopicCategory = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	overflow-wrap: break-word;
`;
export const RemoveButton = styled.div`
	display: flex;
	align-items: center;
	margin-left: 4px;
`;

export const TOSLinks = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 64px;
	padding-left: 1rem;
`;
export const LinkWrapper = styled.div`
	display: flex;
	padding-right: 0.75rem;
	align-items: center;
`;
export const Link = styled.span<{
	padding?: string;
	hover?: string;
	cursor?: string;
}>`
	color: rgb(110, 118, 125);
	margin-top: 2px;
	font-size: 0.813rem;
	font-weight: 400;
	cursor: ${props => props.cursor ?? 'pointer'};
	padding-right: ${props => props.padding ?? '12px'};
	&:hover {
		text-decoration: ${props => props.hover ?? 'underline'};
	}
`;
