import React, { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

import {
	Container,
	ImageWrapper,
	MoreWrapper,
	Name,
	SideWrapper,
	UserInfoWrapper,
	Username,
	UserProfileImage,
} from './Atoms';

export const UserInfo: React.FC<{
	padding?: string;
	backgroundColorHover?: boolean;
	icon?: ReactNode;
	callback?: () => void;
}> = ({ padding, backgroundColorHover = true, icon, callback }) => {
	const { user } = useAuth();
	return (
		<UserInfoWrapper
			padding={padding}
			backgroundColorHover={backgroundColorHover}
			onClick={callback}
		>
			<Container>
				<ImageWrapper>
					<UserProfileImage
						draggable={false}
						src={user?.profilePicture}
					/>
				</ImageWrapper>
				<SideWrapper>
					<Name>{user?.name}</Name>
					<Username>
						{'@' +
							user?.username.split(' ').join('_').toLowerCase()}
					</Username>
				</SideWrapper>
			</Container>
			<MoreWrapper>{icon}</MoreWrapper>
		</UserInfoWrapper>
	);
};
