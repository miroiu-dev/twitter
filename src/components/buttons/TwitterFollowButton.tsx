import styled from '@emotion/styled';

const FollowButton = styled.button`
	min-width: 51.52px;
	min-height: 32px;
	background-color: rgba(255, 255, 255, 1);
	padding-left: 1em;
	padding-right: 1em;
	border-radius: 9999px;
	border: 1px solid rgba(0, 0, 0, 0);
	border-radius: 9999px;
	color: rgb(15, 20, 25);
	font-weight: 700;
	font-size: 0.938rem;
	outline: none;
	transition: 200ms;
	cursor: pointer;
	&:hover {
		background-color: rgb(230, 230, 230);
	}
`;

const FollowButtonWrapper = styled.div`
	margin-left: 12px;
	display: flex;
	align-items: center;
`;

export const TwitterFollowButton: React.FC = () => {
	return (
		<FollowButtonWrapper>
			<FollowButton>Follow</FollowButton>
		</FollowButtonWrapper>
	);
};
