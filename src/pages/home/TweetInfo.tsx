import styled from '@emotion/styled';

const Name = styled.span`
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
	margin-right: 5px;
`;

const FlexRow = styled.div<{ flexDirection?: string }>`
	display: flex;
	flex-direction: ${props => props.flexDirection ?? 'row'};
	&:hover ${Name} {
		text-decoration: underline;
	}
`;

const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-right: 5px;

	white-space: nowrap !important;
	word-break: normal !important;
`;

const TweetDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	white-space: nowrap !important;
	word-break: normal !important;
`;
const FlexContainer = styled.div`
	display: flex;
	overflow: hidden;
	white-space: nowrap !important;
	word-break: normal !important;
`;

export const TweetInfo: React.FC<{
	author: {
		name: string;
		username: string;
		profilePicture?: string;
		id?: string;
	};
	date?: string;
	showDate?: boolean;
	flexDirection?: string;
}> = ({ author, date, showDate = true, flexDirection }) => {
	return (
		<FlexContainer>
			<FlexRow flexDirection={flexDirection}>
				<Name>{author.name}</Name>
				<Username>@{author.username}</Username>
			</FlexRow>
			{showDate && <TweetDate> · {date}</TweetDate>}
		</FlexContainer>
	);
};
