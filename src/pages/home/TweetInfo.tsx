import styled from '@emotion/styled/macro';

const Name = styled.span`
	font-weight: 700;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
	margin-right: 5px;
`;

const FlexRow = styled.div`
	display: flex;
	&:hover ${Name} {
		text-decoration: underline;
	}
`;

const Username = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	margin-right: 5px;
`;

const TweetDate = styled.span`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
`;
const FlexContainer = styled.div`
	display: flex;
	:hover {
	}
`;

export const TweetInfo: React.FC<{
	author: {
		name: string;
		username: string;
		profilePicture?: string;
		id?: string;
	};
	date: string;
}> = ({ author, date }) => {
	return (
		<FlexContainer>
			<FlexRow>
				<Name>{author.name}</Name>
				<Username>@{author.username}</Username>
			</FlexRow>
			<TweetDate> · {date}</TweetDate>
		</FlexContainer>
	);
};
