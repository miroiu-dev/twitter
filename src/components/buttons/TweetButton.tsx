import styled from '@emotion/styled';
import { Tweet } from '../icons/Tweet';

const TweetButtonWrapper = styled.div`
	border-radius: 9999px;
	display: flex;
	justify-content: center;
	background-color: rgb(29, 161, 242);
	padding: 0.8rem;
	width: fit-content;
	cursor: pointer;
	transition: 200ms;
	&:hover {
		background-color: rgb(26, 145, 218);
	}
`;

const TweetIcon = styled(Tweet)`
	height: 1.5em;
	width: 1.5em;
	fill: #fff;
	font-size: 0.938rem;
`;

export const TweetButton: React.FC = () => {
	return (
		<TweetButtonWrapper>
			<TweetIcon></TweetIcon>
		</TweetButtonWrapper>
	);
};
