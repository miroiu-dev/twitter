import styled from '@emotion/styled/macro';
import { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Dots } from '../icons/Dots';
import default_profile_normal from '../images/default_profile_normal.png';

const UserInfoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.75rem;
	cursor: pointer;
	margin: 0.75rem 0;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
		border-radius: 9999px;
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
const DotsSVG = styled(Dots)`
	fill: rgb(217, 217, 217);
	height: 1.25em;
`;

export const UserInfo: React.FC = () => {
	const { user } = useContext(UserContext);
	return (
		<UserInfoWrapper>
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
			<MoreWrapper>
				<DotsSVG />
			</MoreWrapper>
		</UserInfoWrapper>
	);
};
