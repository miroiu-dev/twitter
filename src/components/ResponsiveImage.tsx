import styled from '@emotion/styled';

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

export const RealImage = styled.img`
	max-width: 502px;
	max-height: 282.38px;
	width: 100%;
	opacity: 0;
`;

export const ResponsiveImage: React.FC<{
	src?: string;
	className?: string;
}> = ({ children, className, src }) => {
	return (
		<ImageWrapper className={className} url={src}>
			<RealImage draggable="false" alt="uploaded-pic" src={src} />
			{children}
		</ImageWrapper>
	);
};
