import styled from '@emotion/styled';
import { Bookmarks, BookmarksFilled } from '../icons/Bookmarks';
import { Hashtag, HashtagFilled } from '../icons/Hashtag';
import { House, HouseFilled } from '../icons/House';
import { Lists, ListsFilled } from '../icons/Lists';
import { Messages, MessagesFilled } from '../icons/Messages';
import { More } from '../icons/More';
import { Notifications, NotificationsFilled } from '../icons/Notifications';
import { Profile, ProfileFilled } from '../icons/Profile';

const BaseIcon = styled.svg`
	height: 1.75rem;
	transition: 200ms;
`;

export const NotificationsSVG = BaseIcon.withComponent(Notifications);

export const HouseSVG = BaseIcon.withComponent(House);
export const HouseFilledSVG = BaseIcon.withComponent(HouseFilled);
export const HashtagSVG = BaseIcon.withComponent(Hashtag);
export const HashtagFilledSVG = BaseIcon.withComponent(HashtagFilled);
export const NotificationsFilledSVG =
	BaseIcon.withComponent(NotificationsFilled);
export const MessagesSVG = BaseIcon.withComponent(Messages);
export const MessagesFilledSVG = BaseIcon.withComponent(MessagesFilled);
export const BookmarksSVG = BaseIcon.withComponent(Bookmarks);
export const BookmarksFilledSVG = BaseIcon.withComponent(BookmarksFilled);
export const ListsSVG = BaseIcon.withComponent(Lists);
export const ListsFilledSVG = BaseIcon.withComponent(ListsFilled);
export const ProfileSVG = BaseIcon.withComponent(Profile);
export const ProfileFilledSVG = BaseIcon.withComponent(ProfileFilled);
export const MoreSVG = BaseIcon.withComponent(More);
