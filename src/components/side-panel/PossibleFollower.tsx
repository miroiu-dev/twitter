import { TwitterFollowButton } from '../buttons/TwitterFollowButton';
import { UserAvatar } from '../user/UserAvatar';
import { PossibleFollowerWrapper, ProfileWrapper } from './Atoms';
export type PossibleFollowerProps = {
	name?: string;
	username?: string;
	profilePicture?: string;
};

export const PossibleFollower: React.FC<PossibleFollowerProps> = ({
	name = 'User User',
	username = 'user',
	profilePicture,
}) => {
	return (
		<PossibleFollowerWrapper>
			<ProfileWrapper>
				<UserAvatar
					name={name}
					username={username}
					profilePicture={profilePicture}
					imageWidth="48px"
					imageHeight="48px"
					hoverBrightness="0.8"
					hoverDecoration="underline"
				/>
			</ProfileWrapper>
			<TwitterFollowButton />
		</PossibleFollowerWrapper>
	);
};
