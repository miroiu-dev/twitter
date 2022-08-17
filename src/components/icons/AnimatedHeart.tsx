import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const heartBurst = keyframes`
 from {background-position:left;}
 to { background-position:right;}
`;

const Heart = styled.div<{ width?: string; height?: string }>`
	position: absolute;
	cursor: pointer;
	/* width: 36px;
	height: 36px; */
	width: ${props => props.width || '55px'};
	height: ${props => props.height || '55px'};
	background-image: url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
	background-position: left;
	background-repeat: no-repeat;
	background-size: 2900%;
	animation: ${heartBurst} 0.8s steps(28) forwards;
`;

export const AnimatedHeart: React.FC<{ width?: string; height?: string }> = ({
	width,
	height,
}) => {
	return <Heart height={height} width={width} />;
};
