import styled from '@emotion/styled';
import { TwitterButton } from '../../components/buttons/TwitterButton';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
	max-width: 400px;
	width: 100%;
	margin: 0 auto;
	padding: 1.25rem 1rem;
	box-sizing: border-box;
`;

export const Title = styled.h1`
	font-size: 1.938rem;
	color: rgb(217, 217, 217);
	font-family: Chirp;
	margin-bottom: 0.75rem;
	margin-top: 2rem;
`;

export const Form = styled.form``;

export const InputWrapper = styled.div`
	padding: 0.75rem 0;
`;

export const LoginButton = styled(TwitterButton)`
	margin: 0.75rem 0;
	font-size: 0.938rem;
	outline: none;
	max-width: 100%;
`;
export const IconWrapper = styled.div``;
export const FlexWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 1.25rem;
	font-size: 0.938rem;
`;
export const AuthLink = styled(Link)`
	color: rgb(27, 149, 224);
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;
export const Dot = styled.span`
	color: rgb(110, 118, 125);
	padding: 0 0.25rem;
`;

export const ErrorMessage = styled.div`
	color: rgb(224, 36, 94);
	font-size: 0.938rem;
`;
