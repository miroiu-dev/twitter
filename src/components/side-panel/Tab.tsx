import { ReactNode } from 'react';
import {
	Footer,
	HeaderWrapper,
	IconWrapper,
	More,
	Title,
	TrendingTab,
	Wrapper,
} from './Atoms';

type TabProps = {
	title: string;
	icon?: ReactNode;
	children: ReactNode;
};

export const Tab: React.FC<TabProps> = ({ title, icon, children }) => {
	return (
		<TrendingTab>
			<HeaderWrapper>
				<Title>{title}</Title>
				{icon && (
					<Wrapper>
						<IconWrapper>{icon}</IconWrapper>
					</Wrapper>
				)}
			</HeaderWrapper>
			{children}
			<Footer>
				<More>Show more</More>
			</Footer>
		</TrendingTab>
	);
};
