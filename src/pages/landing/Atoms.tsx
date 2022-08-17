import styled from '@emotion/styled';
import { TwitterLink } from '../../components/buttons/TwitterButton';
import TwitterSvg from '../../components/icons/TwitterSvg';

export const AuthScreenWrapper = styled.div`
	display: grid;
	grid-template-rows: 1fr auto;
	height: 100vh;
`;

export const DecorationWrapper = styled.div`
	background-image: url('https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png');
	z-index: -1;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const AuthWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0 1rem 0 1rem;
	min-width: 45vw;
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.25rem;
`;

export const InspirationalHeadline = styled.h1`
	letter-spacing: -1.2px;
	font-family: Chirp, Verdana, System;
	font-size: 4rem;
	font-weight: 700;
	color: rgb(217, 217, 217);
	line-height: calc(84px);
	margin: 3rem 0 3rem 0;
	font-family: Chirp;
	@media (max-width: 500px) {
		font-size: 2.5rem;
		line-height: calc(52.5px);
	}
`;

export const Join = styled.h1`
	letter-spacing: -1.2px;
	font-family: Chirp;
	font-size: 1.938rem;
	font-weight: 700;
	color: rgb(217, 217, 217);
	margin-bottom: 2rem;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	@media (max-width: 1000px) {
		flex-direction: row;
	}
	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

export const NavigationLinks = styled.div`
	height: 2.5vh;
	width: 100%;
	padding-top: 0.75rem;
	padding-bottom: 0.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

export const NavigationLink = styled.span`
	padding-right: 16px;
	color: rgb(110, 118, 125);
	line-height: 1rem;
	font-size: 0.813rem;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

export const StyledTwitterSvg = styled(TwitterSvg)`
	@media (max-width: 1000px) {
		max-height: 250px;
		margin: 40px 0;
	}
`;

export const RowsLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;

	@media (max-width: 1000px) {
		grid-template-columns: unset;
		grid-template-rows: 1fr auto;

		${AuthWrapper} {
			grid-row: 1;
			margin: 0 auto;
		}
	}
`;
export const AuthButton = styled(TwitterLink)`
	@media (max-width: 1000px) {
		margin-right: 1.25rem;
		margin-top: 1.25rem;
	}
	@media (max-width: 500px) {
		margin: 0;
		margin-bottom: 1rem;
	}
`;
