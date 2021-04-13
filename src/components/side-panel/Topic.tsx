import { TwitterFollowButton } from '../buttons/TwitterFollowButton';
import {
	TopicCategory,
	TopicWrapper,
	TopicName,
	FlexContainer,
	RemoveButton,
	IconWrapper,
	RemoveSVG,
} from './Atoms';

type TopicProps = {
	name: string;
	category: string;
};

export const Topic: React.FC<TopicProps> = ({ name, category }) => {
	return (
		<TopicWrapper>
			<FlexContainer flexDirection="column">
				<TopicName>{name}</TopicName>
				<TopicCategory>{category}</TopicCategory>
			</FlexContainer>
			<FlexContainer>
				<TwitterFollowButton />
				<RemoveButton>
					<IconWrapper padding="0.2rem">
						<RemoveSVG></RemoveSVG>
					</IconWrapper>
				</RemoveButton>
			</FlexContainer>
		</TopicWrapper>
	);
};
