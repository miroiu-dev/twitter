import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useScreenType } from '../../hooks/useScreenType';

const LeftPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const RightPanel = styled.div`
	display: flex;
	flex-direction: column;
`;

type LayoutProps = {
	children: ReactNode;
	leftPanel?: ReactNode;
	rightPanel?: ReactNode;
	tabletSidebar?: ReactNode;
};

const LayoutWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

export const Layout: React.FC<LayoutProps> = ({
	children,
	leftPanel,
	rightPanel,
	tabletSidebar,
}) => {
	const screenType = useScreenType();
	let middle = null;

	if (screenType === '3-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{leftPanel}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</LayoutWrapper>
		);
	} else if (screenType === '2-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</LayoutWrapper>
		);
	} else if (screenType === '1-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
			</LayoutWrapper>
		);
	} else if (screenType === 'fullscreen') {
		middle = <LayoutWrapper>{children}</LayoutWrapper>;
	}

	return middle;
};
