import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useSearchResults } from '../../hooks/useSearchResults';
import {
	tabsService,
	TopicsToFollow,
	Trends,
	WhoToFollow,
} from '../../services/tabs.service';
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
import { Topic } from './Topic';
import { Trend } from './Trend';

export const SidePanel: React.FC = () => {
	const [searchText, setSearchText] = useState('');
	const results = useSearchResults(searchText);
	const { openModal, ref, show } = useModal();
	const trends = useRef<Trends[] | null>(null);
	const toFollow = useRef<WhoToFollow[] | null>(null);
	const topics = useRef<TopicsToFollow[] | null>(null);

	useEffect(() => {
		trends.current = tabsService.trendsForYou();
		toFollow.current = tabsService.whoToFollow();
		topics.current = tabsService.topicsToFollow();
	}, []);
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
			</Container>
			<Tab title="Trends for you" icon={<Settings />}>
				{trends.current?.map(trend => (
					<Trend
						key={trend.name}
						name={trend.name}
						tweets={trend.tweets}
					></Trend>
				))}
			</Tab>
			<Tab title="Who to follow">
				{toFollow.current?.map(toFollow => (
					<PossibleFollower
						key={toFollow.username}
						profilePicture={toFollow.profilePicture}
						name={toFollow.name}
						username={toFollow.username}
					></PossibleFollower>
				))}
			</Tab>
			<Tab title="Topics to follow">
				{topics.current?.map(topic => (
					<Topic
						key={topic.title}
						name={topic.title}
						category={topic.category}
					/>
				))}
			</Tab>
		</SidePanelWrapper>
	);
};
