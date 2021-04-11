import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import { TwitterButton } from '../buttons/TwitterButton';
import { Bookmarks, BookmarksFilled } from '../icons/Bookmarks';
import { Hashtag, HashtagFilled } from '../icons/Hashtag';
import { House, HouseFilled } from '../icons/House';
import { Lists, ListsFilled } from '../icons/Lists';
import { Messages, MessagesFilled } from '../icons/Messages';
import { More } from '../icons/More';
import { Notifications, NotificationsFilled } from '../icons/Notifications';
import { Profile, ProfileFilled } from '../icons/Profile';
import TwitterSvg from '../icons/TwitterSvg';
import { UserInfo } from '../user/UserInfo';
import { SidebarLink } from './SidebarLink';

const NavigationWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const SidebarWrapper = styled.div`
	//experimental
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ButtonWrapper = styled.div`
	margin: 1rem 0;
`;

const TwitterSvgWrapper = styled(Link)`
	background-color: transparent;
	width: fit-content;
	display: flex;
	padding: 0.5rem;
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

const BaseIcon = styled.svg`
	height: 1.75rem;
	transition: 200ms;
`;

const NotificationsSVG = BaseIcon.withComponent(Notifications);

const HouseSVG = BaseIcon.withComponent(House);
const HouseFilledSVG = BaseIcon.withComponent(HouseFilled);
const HashtagSVG = BaseIcon.withComponent(Hashtag);
const HashtagFilledSVG = BaseIcon.withComponent(HashtagFilled);
const NotificationsFilledSVG = BaseIcon.withComponent(NotificationsFilled);
const MessagesSVG = BaseIcon.withComponent(Messages);
const MessagesFilledSVG = BaseIcon.withComponent(MessagesFilled);
const BookmarksSVG = BaseIcon.withComponent(Bookmarks);
const BookmarksFilledSVG = BaseIcon.withComponent(BookmarksFilled);
const ListsSVG = BaseIcon.withComponent(Lists);
const ListsFilledSVG = BaseIcon.withComponent(ListsFilled);
const ProfileSVG = BaseIcon.withComponent(Profile);
const ProfileFilledSVG = BaseIcon.withComponent(ProfileFilled);
const MoreSVG = BaseIcon.withComponent(More);

export const Sidebar: React.FC = () => {
	return (
		<>
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
				<UserInfo />
			</SidebarWrapper>
		</>
	);
};
