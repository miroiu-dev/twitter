import styled from '@emotion/styled';
import { ReactNode } from 'react';

type TweetOptionProps = {
	label: string;
	icon: ReactNode;
	color?: string;
	callback?: () => void;
};

const Label = styled.span`
	font-weight: 400;
	font-size: 0.938rem;
`;

const OptionWrapper = styled.div<{ color?: string }>`
	padding: 1rem;
	display: flex;
	align-items: center;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
	${Label} {
		color: ${props => props.color || 'rgb(217, 217, 217)'}!important;
	}
`;

const OptionIconWrapper = styled.div<{ color?: string }>`
	margin-right: 0.75rem;
	height: 1.25em;
	width: 1.25em;
	fill: ${props => props.color || 'rgb(110, 118, 125)'};
`;

export const TweetOption: React.FC<TweetOptionProps> = ({
	label,
	icon,
	color,
	callback,
}) => {
	return (
		<OptionWrapper color={color} onClick={() => callback && callback()}>
			<OptionIconWrapper color={color}>{icon} </OptionIconWrapper>
			<Label>{label}</Label>
		</OptionWrapper>
	);
};
