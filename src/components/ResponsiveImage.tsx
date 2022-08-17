import styled from '@emotion/styled';
import { ReactNode } from 'react';

export const ImageWrapper = styled.div<{ url?: string }>`
	display: flex;
	position: relative;
	cursor: pointer;
	background-image: url(${props => props.url});
	border-radius: 16px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;

export const RealImage = styled.img<{ maxWidth?: boolean }>`
	max-width: ${props => !props.maxWidth && '502px'};
	max-height: ${props => !props.maxWidth && '282.38px'};
	width: 100%;
	opacity: 0;
`;

export const ResponsiveImage: React.FC<{
	children?: ReactNode;
	src?: string;
	className?: string;
	maxWidth?: boolean;
}> = ({ children, className, src, maxWidth }) => {
	return (
		<ImageWrapper className={className} url={src}>
			<RealImage
				draggable="false"
				alt="uploaded-pic"
				src={src}
				maxWidth={maxWidth}
			/>
			{children}
		</ImageWrapper>
	);
};
