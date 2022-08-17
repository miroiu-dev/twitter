import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Sparkles } from '../../components/icons/Sparkles';
import { IconWrapper } from '../../components/side-panel/Atoms';

import { CreateTweet } from './CreateTweet';
import { Feed } from './Feed';

export const HomeLayout = styled.div`
	max-width: 600px;
	width: 100%;
	border-left: 1px solid rgb(47, 51, 54);
	border-right: 1px solid rgb(47, 51, 54);
`;
const Header = styled.div`
	height: 53px;
	padding: 0 1rem;
	background: #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
	position: sticky;
	top: 0;
	z-index: 4;
`;

const Icon = styled(Sparkles)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
`;

const Title = styled(Link)`
	font-weight: 800;
	font-size: 1.25rem;
	color: rgb(217, 217, 217);
	text-decoration: none;
`;

const Separator = styled.div`
	height: 12px;
	border-bottom: 1px solid rgb(47, 51, 54);
	background-color: rgb(21, 24, 28);
`;

export const Home: React.FC = () => {
	return (
		<HomeLayout>
			<Header>
				<Title to="/home">Home</Title>
				<IconWrapper>
					<Icon />
				</IconWrapper>
			</Header>
			<CreateTweet />
			<Separator></Separator>
			<Feed />
		</HomeLayout>
	);
};
