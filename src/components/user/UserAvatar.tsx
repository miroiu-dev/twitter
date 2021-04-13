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
	imageWidth?: string;
	imageHeight?: string;
	hoverBrightness?: string;
	hoverDecoration?: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
	name,
	username,
	profilePicture,
	imageWidth,
	imageHeight,
	hoverBrightness,
	hoverDecoration,
}) => {
	return (
		<>
			<ImageWrapper>
				<UserProfileImage
					src={profilePicture ?? default_profile_normal}
					width={imageWidth}
					height={imageHeight}
					hover={hoverBrightness}
				/>
			</ImageWrapper>
			<SideWrapper hoverDecoration={hoverDecoration}>
				<Name>{name}</Name>
				<Username>
					{'@' + username.split(' ').join('_').toLowerCase()}
				</Username>
			</SideWrapper>
		</>
	);
};
