import styled from '@emotion/styled/macro';
import React, { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

import default_profile_normal from '../images/default_profile_normal.png';

type UserInfoWrapperProps = {
	padding?: string;
	backgroundColorHover?: boolean;
};

const UserInfoWrapper = styled.div<UserInfoWrapperProps>`
	display: flex;
	user-select: none;
	justify-content: space-between;
	padding: ${props => props.padding || '0.75rem'};
	cursor: ${props => props.backgroundColorHover && 'pointer'};
	margin: 0.75rem 0;
	border-radius: 9999px;

	&:hover {
		background-color: ${props =>
			props.backgroundColorHover && 'rgba(29, 161, 242, 0.1)'};
	}
`;

const Container = styled.div`
	display: flex;
`;

const ImageWrapper = styled.div``;

const UserProfileImage = styled.img`
	border-radius: 9999px;
	height: 40px;
	width: 40px;
`;

const Name = styled.span`
	color: rgb(217, 217, 217);
	font-size: 0.938rem;
	font-weight: 700;
	white-space: nowrap;
`;

const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
`;

const SideWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0.75rem;
`;

const MoreWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

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
					<UserProfileImage src={default_profile_normal} />
				</ImageWrapper>
				<SideWrapper>
					<Name>{user?.username}</Name>
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
