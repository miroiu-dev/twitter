import styled from '@emotion/styled';
import TwitterSvg from '../icons/TwitterSvg';
import { Link } from 'react-router-dom';
import { TwitterButton } from '../buttons/TwitterButton';
import { Dots } from '../icons/Dots';

import { UserOptionsModal } from '../modals/UserOptions';
import { UserInfo } from '../user/UserInfo';
import { SidebarLink } from './SidebarLink';
import {
	BookmarksFilledSVG,
	BookmarksSVG,
	HashtagFilledSVG,
	HashtagSVG,
	HouseFilledSVG,
	HouseSVG,
	ListsFilledSVG,
	ListsSVG,
	MessagesFilledSVG,
	MessagesSVG,
	MoreSVG,
	NotificationsFilledSVG,
	NotificationsSVG,
	ProfileFilledSVG,
	ProfileSVG,
} from './Atoms';
import { useCallback, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

const UserInfoWrapper = styled.div`
	position: relative;
`;

const NavigationWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const SidebarWrapper = styled.div`
	margin: 0 0.75rem;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 275px;
	/* position: fixed; */
	position: sticky;
	top: 0;
`;

const ButtonWrapper = styled.div`
	margin: 1rem 0;
`;

const TwitterSvgWrapper = styled(Link)`
	background-color: transparent;
	width: fit-content;
	display: flex;
	padding: 0.75rem;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
	border-radius: 9999px;
	transition: 200ms;
	cursor: pointer;
`;

const TwitterSvgIcon = styled(TwitterSvg)`
	width: 100%;
`;

const DotsSVG = styled(Dots)`
	fill: rgb(217, 217, 217);
	height: 1.25em;
`;

export const Sidebar: React.FC = () => {
	const [shouldOpen, setShouldOpen] = useState(false);
	const div = useRef<HTMLDivElement | null>(null);
	const show = useCallback(
		() => setShouldOpen(!shouldOpen),
		[shouldOpen, setShouldOpen]
	);
	useClickOutside(div, show);
	return (
		<SidebarWrapper>
			<Wrapper>
				<TwitterSvgWrapper to="/home">
					<TwitterSvgIcon
						maxWidth="30px"
						fill="rgb(217, 217, 217)"
					></TwitterSvgIcon>
				</TwitterSvgWrapper>
				<NavigationWrapper>
					<SidebarLink
						label="Home"
						path="/home"
						icon={HouseSVG}
						iconFilled={HouseFilledSVG}
					/>
					<SidebarLink
						label="Explore"
						path="/explore"
						icon={HashtagSVG}
						iconFilled={HashtagFilledSVG}
					/>
					<SidebarLink
						label="Notifications"
						path="/notifications"
						icon={NotificationsSVG}
						iconFilled={NotificationsFilledSVG}
					/>
					<SidebarLink
						label="Messages"
						path="/messages"
						icon={MessagesSVG}
						iconFilled={MessagesFilledSVG}
					/>
					<SidebarLink
						label="Bookmarks"
						path="/bookmarks"
						icon={BookmarksSVG}
						iconFilled={BookmarksFilledSVG}
					/>
					<SidebarLink
						label="Lists"
						path="/lists"
						icon={ListsSVG}
						iconFilled={ListsFilledSVG}
					/>
					<SidebarLink
						label="Profile"
						path="/profile"
						icon={ProfileSVG}
						iconFilled={ProfileFilledSVG}
					/>
					<SidebarLink
						label="More"
						path="/more"
						icon={MoreSVG}
						iconFilled={MoreSVG}
					/>
				</NavigationWrapper>
				<ButtonWrapper>
					<TwitterButton width="90%" fontSize="0.938rem">
						Tweet
					</TwitterButton>
				</ButtonWrapper>
			</Wrapper>

			<UserInfoWrapper>
				<UserInfo icon={<DotsSVG />} callback={show} />
				<UserOptionsModal show={shouldOpen} ref={div} />
			</UserInfoWrapper>
		</SidebarWrapper>
	);
};
