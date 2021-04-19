import { useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { FullTweet } from '../../../models/FullTweet';
import { monthsMap } from '../../../utils/getReadableDate';
import { TweetInfo } from '../TweetInfo';
import {
	Ammount,
	AmmountLabel,
	Ammounts,
	AmmountWrapper,
	CreatedAtDate,
	DateBar,
	Dot,
	FlexRow,
	FlexRowJustifyContent,
	Platform,
	ProfileImage,
	ProfileImageWrapper,
	TweetContent,
	TweetContentWrapper,
	TweetImage,
	ViewActivityLabel,
	ViewActivitySVG,
	ViewActivityWrapper,
} from './Atoms';
import { TweetModalOptions } from './FullTweetModalOptions';
export const TweetData: React.FC<
	FullTweet & { openDeletionModal: () => void }
> = ({
	author,
	message,
	attachment,
	createdAt,
	numberOfComments,
	numberOfLikes,
	numberOfRetweets,
	openDeletionModal,
}) => {
	const getTweetDate = (date: Date) => {
		const hour = date.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
		const day = date.getDate();
		const month = monthsMap.get(date.getMonth());
		const year = date.getFullYear();
		return `${hour} · ${month} ${day}, ${year}`;
	};

	const date = useMemo(() => {
		return getTweetDate(new Date(createdAt));
	}, [createdAt]);

	const { user } = useAuth();
	return (
		<>
			<FlexRow>
				<ProfileImageWrapper>
					<ProfileImage src={author.profilePicture}></ProfileImage>
				</ProfileImageWrapper>
				<FlexRowJustifyContent>
					<TweetInfo
						author={author}
						showDate={false}
						flexDirection="column"
					/>
					<TweetModalOptions
						author={author}
						openDeletionModal={openDeletionModal}
					/>
				</FlexRowJustifyContent>
			</FlexRow>
			<TweetContentWrapper>
				<TweetContent>{message}</TweetContent>
			</TweetContentWrapper>
			{attachment && (
				<TweetImage maxWidth={true} src={attachment}></TweetImage>
			)}
			<DateBar>
				<CreatedAtDate>{date}</CreatedAtDate>
				<Dot> · </Dot>
				<Platform>Twitter Web App</Platform>
			</DateBar>
			{author.username === user?.username && (
				<ViewActivityWrapper>
					<ViewActivitySVG></ViewActivitySVG>
					<ViewActivityLabel>View Tweet activity</ViewActivityLabel>
				</ViewActivityWrapper>
			)}
			{(numberOfRetweets > 0 || numberOfLikes > 0) && (
				<Ammounts>
					{numberOfRetweets > 0 && (
						<AmmountWrapper>
							<Ammount>{numberOfRetweets}</Ammount>
							<AmmountLabel>Retweets</AmmountLabel>
						</AmmountWrapper>
					)}
					{numberOfLikes > 0 && (
						<AmmountWrapper>
							<Ammount>{numberOfLikes}</Ammount>
							<AmmountLabel>Likes</AmmountLabel>
						</AmmountWrapper>
					)}
				</Ammounts>
			)}
		</>
	);
};
