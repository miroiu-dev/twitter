import styled from '@emotion/styled/macro';

export type UserInfoWrapperProps = {
	padding?: string;
	backgroundColorHover?: boolean;
};

export const UserInfoWrapper = styled.div<UserInfoWrapperProps>`
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

export const Container = styled.div`
	display: flex;
`;

export const ImageWrapper = styled.div``;

export const UserProfileImage = styled.img`
	border-radius: 9999px;
	height: 40px;
	width: 40px;
`;

export const Name = styled.span`
	color: rgb(217, 217, 217);
	font-size: 0.938rem;
	font-weight: 700;
	white-space: nowrap;
`;

export const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
`;

export const SideWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0.75rem;
`;

export const MoreWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
