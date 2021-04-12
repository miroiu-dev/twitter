import styled from '@emotion/styled/macro';
import default_profile_normal from '../images/default_profile_normal.png';

export const UserAvatar: React.FC = () => {
	return (
		<>
			<ImageWrapper>
				<UserProfileImage src={default_profile_normal} />
			</ImageWrapper>
			<SideWrapper>
				<Name>Minecraft Steve</Name>
				<Username>
					{'@' + 'Minecraft Steve'.split(' ').join('_').toLowerCase()}
				</Username>
			</SideWrapper>
		</>
	);
};
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
