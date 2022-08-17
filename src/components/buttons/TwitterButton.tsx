import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type TwitterButtonProps = {
	isPrimary?: boolean;
	width?: string;
	fontSize?: string;
};

export const TwitterButton = styled.button<TwitterButtonProps>`
	width: ${props => props.width || '100%'};
	max-width: 380px;
	color: ${props => (!props.isPrimary ? '#fff' : 'rgba(29,161,242,1)')};
	background-color: ${props =>
		!props.isPrimary ? 'rgb(29, 161, 242)' : 'transparent'};
	min-height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-bottom: 1.25rem;
	border-radius: 9999px;
	font-size: ${props => props.fontSize};
	font-weight: 700;
	text-decoration: none;
	outline: none;
	border: 1px solid
		${props => (props.isPrimary ? 'rgb(29, 161, 242)' : 'transparent')};
	&:hover {
		background-color: ${props =>
			props.isPrimary ? 'rgba(29,161,242,0.1)' : 'rgb(26,145,218)'};
	}
	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
	&:disabled:hover {
		background-color: rgb(29, 161, 242);
	}
`;

export const TwitterLink = styled(TwitterButton, {
	shouldForwardProp: prop => prop !== 'isPrimary',
})``.withComponent(Link);
