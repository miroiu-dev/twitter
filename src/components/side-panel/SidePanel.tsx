import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useSearchResults } from '../../hooks/useSearchResults';
import { UserAvatar } from '../user/UserAvatar';
import {
	SidePanelWrapper,
	Container,
	SearchBarWrapper,
	SearchIconWrapper,
	SearchIcon,
	SearchBarContainer,
	SearchBar,
	SearchResults,
	TrySearching,
	Results,
	Result,
	Settings,
} from './Atoms';
import { Tab } from './Tab';
import { Trend } from './Trend';
export const SidePanel: React.FC = () => {
	const [searchText, setSearchText] = useState('');
	const results = useSearchResults(searchText);
	const { openModal, ref, show } = useModal();

	return (
		<SidePanelWrapper>
			<Container ref={ref}>
				<SearchBarWrapper>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<SearchBarContainer>
						<SearchBar
							placeholder="Search Twitter"
							value={searchText}
							onChange={ev => setSearchText(ev.target.value)}
							onClick={openModal}
						/>
					</SearchBarContainer>
				</SearchBarWrapper>
				{show && (
					<SearchResults>
						{results.length === 0 && (
							<TrySearching>
								Try searching for people, topics, or keywords
							</TrySearching>
						)}
						<Results>
							{results.map(result => (
								<Result key={result.username}>
									<UserAvatar
										name={result.name}
										username={result.username}
										profilePicture={result.profilePicture}
									/>
								</Result>
							))}
						</Results>
					</SearchResults>
				)}
				<Tab title="Trends for you" icon={<Settings />}>
					<Trend name="felix" tweets="181K" />
					<Trend name="felix" tweets="181K" />
					<Trend name="felix" tweets="181K" />
				</Tab>
				<Tab title="Who to follow">
					<PossibleFollower />
				</Tab>
			</Container>
		</SidePanelWrapper>
	);
};

const PossibleFollowerWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid rgb(47, 51, 54);
	transition: 200ms;
	padding: 0.75rem 1rem;
	cursor: pointer;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

const ProfileWrapper = styled.div`
	display: flex;
`;

const FollowButtonWrapper = styled.div`
	margin-left: 12px;
	display: flex;
	align-items: center;
`;

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
	&:hover {
		background-color: rgb(230, 230, 230);
	}
`;

const PossibleFollower: React.FC = () => {
	return (
		<PossibleFollowerWrapper>
			<ProfileWrapper>
				<UserAvatar name="asd" username="asd" />
			</ProfileWrapper>
			<FollowButtonWrapper>
				<FollowButton>Follow</FollowButton>
			</FollowButtonWrapper>
		</PossibleFollowerWrapper>
	);
};

//image width and height 48px and hover on name with underline
