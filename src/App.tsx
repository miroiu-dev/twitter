import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/registration/LoginPage';
import { SignupPage } from './pages/registration/SignupPage';
import { useScreenType } from './hooks/useScreenType';
import styled from '@emotion/styled/macro';
import { Sidebar } from './components/sidebar/Sidebar';
import { useAuth } from './hooks/useAuth';
import { TabletSidebar } from './components/table-sidebar/TabletSidebar';
import { SettingsWheel } from './components/icons/SettingsWheel';
import { Search } from './components/icons/Search';
import { UserAvatar } from './components/user/UserAvatar';
import { peopleService, Person } from './services/people.service';
import { useModal } from './hooks/useModal';

const LeftPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const RightPanel = styled.div`
	display: flex;
	flex-direction: column;
`;

type LayoutProps = {
	leftPanel?: ReactNode;
	rightPanel?: ReactNode;
	tabletSidebar?: ReactNode;
};

const LayoutWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const Layout: React.FC<LayoutProps> = ({
	children,
	leftPanel,
	rightPanel,
	tabletSidebar,
}) => {
	const screenType = useScreenType();
	let middle = null;

	if (screenType === '3-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{leftPanel}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</LayoutWrapper>
		);
	} else if (screenType === '2-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
				<RightPanel>{rightPanel}</RightPanel>
			</LayoutWrapper>
		);
	} else if (screenType === '1-cols') {
		middle = (
			<LayoutWrapper>
				<LeftPanel>{tabletSidebar}</LeftPanel>
				{children}
			</LayoutWrapper>
		);
	} else if (screenType === 'fullscreen') {
		middle = <LayoutWrapper>{children}</LayoutWrapper>;
	}

	return middle;
};

const HomeLayout = styled.div`
	max-width: 600px;
	width: 100%;
	border-left: 1px solid rgb(47, 51, 54);
	border-right: 1px solid rgb(47, 51, 54);
`;

const SidePanelWrapper = styled.div`
	width: 350px;
	margin-left: 1.875rem;
	margin-top: 4px;
`;

const Settings = styled(SettingsWheel)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1); ;
`;

const TrendingTab = styled.div`
	background-color: rgb(21, 24, 28);
	border: 1px solid rgb(21, 24, 28);
	border-radius: 1rem;
	margin-bottom: 1rem;
`;
const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	color: #fff;
	border-bottom: 1px solid;
	border-bottom-color: rgb(47, 51, 54);
	padding: 0.75rem 1rem;
	position: relative;
`;
const Title = styled.span`
	font-weight: 800;
	font-size: 1.25rem;
	color: rgb(217, 217, 217);
	line-height: 24px;
`;
const IconWrapper = styled.div`
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	border-radius: 50%;
	&:hover {
		background-color: rgba(29, 161, 242, 0.1);
	}
`;
const Wrapper = styled.div`
	height: 1.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2px;
`;

const SearchBar = styled.input`
	width: 100%;
	background-color: rgb(32, 35, 39);
	border: none;
	box-sizing: border-box;
	color: rgb(110, 118, 125);
	outline: none;
	font-size: 0.938rem;
	font-weight: 400;
`;

const SearchIcon = styled(Search)`
	padding-left: 0.75rem;
	fill: rgb(110, 118, 125);
	min-width: 32px;
	user-select: none;
	height: 1.25em;
`;

const SearchBarWrapper = styled.div`
	margin-bottom: 0.75rem;
	background-color: rgb(32, 35, 39);
	border-radius: 9999px;
	display: flex;
	box-sizing: border-box;
	border: 1px solid rgb(32, 35, 39);

	&:focus-within {
		border: 1px solid rgb(29, 161, 242);
		background-color: #000;
	}
	&:focus-within ${SearchBar} {
		background-color: #000;
	}
	&:focus-within ${SearchIcon} {
		fill: rgb(29, 161, 242);
	}
`;
const SearchIconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SearchBarContainer = styled.div`
	width: 100%;
	padding: 0.75rem;
`;

const Container = styled.div`
	position: relative;
`;

const TrySearching = styled.span`
	padding: 1.25rem;
	color: rgb(110, 118, 125);
	font-size: 15px;
	font-weight: 400;
	height: fit-content;
`;

const SearchResults = styled.div`
	position: absolute;
	min-height: 100px;
	max-height: calc(80vh - 53px);
	width: 100%;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
	overflow-y: auto;
	background-color: #000;
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	z-index: 2;
	margin-top: -11px;
`;

const Results = styled.div`
	display: flex;
	flex-direction: column;
`;
const Result = styled.div`
	display: flex;
	padding: 0.75rem 1rem;
	cursor: pointer;
	pointer-events: all !important;
	transition: 200ms;
	&:hover {
		background-color: rgb(21, 24, 28);
	}
	border-bottom: 1px solid rgb(47, 51, 54);
`;

const useSearchResults = (searchText: string) => {
	const [results, setResults] = useState<Person[]>([]);

	const search = useCallback(async (text: string) => {
		try {
			const result = await peopleService.search(text);
			setResults(result);
		} catch (err) {}
	}, []);

	useEffect(() => {
		if (searchText.trim()) {
			const timerId = setTimeout(() => search(searchText), 300);
			return () => clearTimeout(timerId);
		} else {
			setResults([]);
		}
	}, [search, searchText]);
	return results;
};

const SidePanel: React.FC = () => {
	const [searchText, setSearchText] = useState('');
	const results = useSearchResults(searchText);
	const { openModal, ref, show } = useModal();

	return (
		<SidePanelWrapper>
			<Container>
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
					<SearchResults ref={ref}>
						{results.length === 0 && (
							<TrySearching>
								Try searching for people, topics, or keywords
							</TrySearching>
						)}
						<Results>
							{results.map(result => (
								<Result>
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
			<TrendingTab>
				<HeaderWrapper>
					<Title>Trends for you</Title>
					<Wrapper>
						<IconWrapper>
							<Settings />
						</IconWrapper>
					</Wrapper>
				</HeaderWrapper>
			</TrendingTab>
		</SidePanelWrapper>
	);
};

const App = () => {
	const { user } = useAuth();

	return (
		<Router>
			{user ? (
				<Layout
					rightPanel={<SidePanel />}
					leftPanel={<Sidebar />}
					tabletSidebar={<TabletSidebar />}
				>
					<Switch>
						<Route path="/home">
							<HomeLayout />
						</Route>
						<Route path="/explore"></Route>
						<Route path="/notifications"></Route>
						<Route path="/messages"></Route>
						<Route path="/bookmarks"></Route>
						<Route path="/lists"></Route>
						<Route path="/profile"></Route>
						<Route path="/more"></Route>
						<Route path="/">
							<Redirect to="/home" />
						</Route>
					</Switch>
				</Layout>
			) : (
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/signup">
						<SignupPage />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
			)}
		</Router>
	);
};

export default App;
