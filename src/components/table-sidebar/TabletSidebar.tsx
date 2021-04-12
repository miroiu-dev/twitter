import { useUserOptions } from '../../hooks/useUserOptionsModal';
import { TweetButton } from '../buttons/TweetButton';
import { UserOptionsModal } from '../modals/UserOptions';
import { SidebarLink } from '../sidebar/SidebarLink';
import {
	ContainerWrapper,
	NavigationWrapper,
	ProfilePicture,
	ProfilePictureWrapper,
	TabletSidebarWrapper,
	TweetButtonWrapper,
} from './Atoms';
import default_profile_normal from '../images/default_profile_normal.png';
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
} from '../sidebar/Atoms';
export const TabletSidebar: React.FC = () => {
	const { openModal, show, ref } = useUserOptions();
	return (
		<TabletSidebarWrapper>
			<NavigationWrapper>
				<SidebarLink
					path="/home"
					icon={HouseSVG}
					iconFilled={HouseFilledSVG}
				/>
				<SidebarLink
					path="/explore"
					icon={HashtagSVG}
					iconFilled={HashtagFilledSVG}
				/>
				<SidebarLink
					path="/notifications"
					icon={NotificationsSVG}
					iconFilled={NotificationsFilledSVG}
				/>
				<SidebarLink
					path="/messages"
					icon={MessagesSVG}
					iconFilled={MessagesFilledSVG}
				/>
				<SidebarLink
					path="/bookmarks"
					icon={BookmarksSVG}
					iconFilled={BookmarksFilledSVG}
				/>
				<SidebarLink
					path="/lists"
					icon={ListsSVG}
					iconFilled={ListsFilledSVG}
				/>
				<SidebarLink
					path="/profile"
					icon={ProfileSVG}
					iconFilled={ProfileFilledSVG}
				/>
				<SidebarLink path="/more" icon={MoreSVG} iconFilled={MoreSVG} />
				<TweetButtonWrapper>
					<TweetButton></TweetButton>
				</TweetButtonWrapper>
			</NavigationWrapper>
			<ProfilePictureWrapper>
				<ContainerWrapper onClick={openModal}>
					<ProfilePicture src={default_profile_normal} />
				</ContainerWrapper>
				<UserOptionsModal
					show={show}
					arrowLeft="11%"
					arrowTop="100%"
					modalLeft="60px"
					modalBottom="65px"
					ref={ref}
				></UserOptionsModal>
			</ProfilePictureWrapper>
		</TabletSidebarWrapper>
	);
};
