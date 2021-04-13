import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useSearchResults } from '../../hooks/useSearchResults';
import { TwitterFollowButton } from '../buttons/TwitterFollowButton';
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
import { PossibleFollower } from './PossibleFollower';
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
					<PossibleFollower />
					<PossibleFollower />
				</Tab>
			</Container>
		</SidePanelWrapper>
	);
};
