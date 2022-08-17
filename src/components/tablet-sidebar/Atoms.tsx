import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const TabletSidebarWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
`;

export const NavigationWrapper = styled.div``;

export const TweetButtonWrapper = styled.div`
	padding: 0.3rem 0;
	display: flex;
	justify-content: center;
`;

export const ContainerWrapper = styled.div`
	padding: 0.75rem;
	border-radius: 50%;
	display: flex;
	transition: 200ms;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
`;

export const ProfilePictureWrapper = styled.div`
	position: relative;
	margin: 0.75rem 0;
`;

export const ProfilePicture = styled.img`
	border-radius: 9999px;
	height: 40px;
	width: 40px;
`;

export const TwitterSVGWrapper = styled(Link)`
	display: flex;
	margin-top: 0.4rem;
	cursor: pointer;
	justify-content: center;
	padding: 0.75rem;
	transition: 200ms;
	border-radius: 50%;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
`;
