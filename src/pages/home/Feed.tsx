import styled from '@emotion/styled/macro';
import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import { TweetsContext } from '../../hooks/TweetsContext';
import { Tweet } from './Tweet';

export const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const InfiniteScrolling = styled(InfiniteScroll)`
	overflow-x: hidden !important;
`;

export const Feed: React.FC = () => {
	const { tweets, fetchTweets } = useContext(TweetsContext);
	useEffect(() => {
		fetchTweets();
	}, [fetchTweets]);

	return (
		<InfiniteScrolling
			dataLength={tweets.length} //This is important field to render the next data
			next={fetchTweets}
			hasMore={true}
			loader={
				<LoaderWrapper>
					<Loader
						type="Oval"
						color="rgb(29, 161, 242)"
						height={30}
						width={30}
					/>
				</LoaderWrapper>
			}
		>
			{/* {tweets &&
				tweets.map(tweet => <Tweet key={tweet._id} {...tweet} />)} */}
			<AnimatePresence>
				{tweets &&
					tweets.map(tweet => <Tweet key={tweet._id} {...tweet} />)}
			</AnimatePresence>
		</InfiniteScrolling>
	);
};
