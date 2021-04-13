import React from 'react';
import { useAuth } from '../../hooks/useAuth';

import {
	Wrapper,
	Category,
	DotsSVG,
	Trends,
	TrendsWrapper,
	Tweets,
	IconWrapper,
	Name,
} from './Atoms';

type TrendProps = {
	name: string;
	tweets: string;
};

export const Trend: React.FC<TrendProps> = ({ name, tweets }) => {
	const { user } = useAuth();
	return (
		<TrendsWrapper>
			<Trends>
				<Category>Trending in {user?.country}</Category>
				<Wrapper>
					<IconWrapper>
						<DotsSVG></DotsSVG>
					</IconWrapper>
				</Wrapper>
			</Trends>
			<Name>{name}</Name>
			<Tweets>{tweets} Tweets</Tweets>
		</TrendsWrapper>
	);
};
