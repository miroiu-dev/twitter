import default_profile_normal from '../images/default_profile_normal.png';
import {
	ImageWrapper,
	Name,
	SideWrapper,
	Username,
	UserProfileImage,
} from './Atoms';

type UserAvatarProps = {
	name: string;
	username: string;
	profilePicture?: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
	name,
	username,
	profilePicture,
}) => {
	return (
		<>
			<ImageWrapper>
				<UserProfileImage
					src={profilePicture ?? default_profile_normal}
				/>
			</ImageWrapper>
			<SideWrapper>
				<Name>{name}</Name>
				<Username>
					{'@' + username.split(' ').join('_').toLowerCase()}
				</Username>
			</SideWrapper>
		</>
	);
};
