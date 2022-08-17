import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import {
	Activity,
	Block,
	Delete,
	Embed,
	Mute,
	NotInterseted,
	Pin,
	RemoveFromList,
	Report,
	Unfollow,
} from '../../components/icons/TweetModal';
import { TweetOption } from './TweetOptions';

const TweetModal = styled(motion.div)`
	position: absolute;
	width: 340px;
	z-index: 3;
	top: 0;
	pointer-events: all;
	left: -305px;
	background-color: #000;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
`;

const BaseTweetModalIcon = styled.svg`
	height: 1.25em;
	width: 1.25em;
`;

const NotInterestedSVG = BaseTweetModalIcon.withComponent(NotInterseted);
const UnfollowSVG = BaseTweetModalIcon.withComponent(Unfollow);
const RemoveFromListSVG = BaseTweetModalIcon.withComponent(RemoveFromList);
const MuteSVG = BaseTweetModalIcon.withComponent(Mute);
const BlockSVG = BaseTweetModalIcon.withComponent(Block);
const EmbedSVG = BaseTweetModalIcon.withComponent(Embed);
const ReportSVG = BaseTweetModalIcon.withComponent(Report);

const DeleteSVG = BaseTweetModalIcon.withComponent(Delete);
const PinSVG = BaseTweetModalIcon.withComponent(Pin);
const ActivitySVG = BaseTweetModalIcon.withComponent(Activity);

const SelftTweetModal = styled(TweetModal)``;

type TweetOptionsModalUserProps = {
	show: boolean;
	author: {
		name: string;
		username: string;
		profilePicture?: string;
		id?: string;
	};
};

export const TweetOptionsModalUser = forwardRef<
	HTMLDivElement,
	TweetOptionsModalUserProps
>(({ show, author }, ref) => {
	return (
		<AnimatePresence>
			{show && (
				<TweetModal
					ref={ref}
					initial={{
						height: '0px',
						opacity: 0,
					}}
					animate={{
						height: 'auto',
						opacity: 1,
					}}
				>
					<TweetOption
						icon={<NotInterestedSVG />}
						label="Not interested in this Tweet"
					></TweetOption>
					<TweetOption
						icon={<UnfollowSVG />}
						label={`Unfollow @${author.username}`}
					></TweetOption>
					<TweetOption
						icon={<RemoveFromListSVG />}
						label={`Add/remove @${author.username} from Lists`}
					></TweetOption>
					<TweetOption
						icon={<MuteSVG />}
						label={`Mute @${author.username}`}
					></TweetOption>
					<TweetOption
						icon={<BlockSVG />}
						label={`Block @${author.username}`}
					></TweetOption>{' '}
					<TweetOption
						icon={<EmbedSVG />}
						label="Embed Tweet"
					></TweetOption>{' '}
					<TweetOption
						icon={<ReportSVG />}
						label="Report Tweet"
					></TweetOption>
				</TweetModal>
			)}
		</AnimatePresence>
	);
});

type TweetOptionModalSelf = {
	show: boolean;
	author: {
		name: string;
		username: string;
		profilePicture?: string;
		id?: string;
	};
	callback: () => void;
	secondaryCallback?: () => void;
};

export const TweetOptionsModalSelf = forwardRef<
	HTMLDivElement,
	TweetOptionModalSelf
>(({ show, author, callback, secondaryCallback }, ref) => {
	return (
		<AnimatePresence>
			{show && (
				<SelftTweetModal
					ref={ref}
					initial={{
						height: '0px',
						opacity: 0,
					}}
					animate={{
						height: 'auto',
						opacity: 1,
					}}
				>
					<TweetOption
						icon={<DeleteSVG />}
						label="Delete"
						color="rgb(224, 36, 94)"
						callback={() => {
							callback();
							if (secondaryCallback) {
								secondaryCallback();
							}
						}}
					></TweetOption>
					<TweetOption
						icon={<PinSVG />}
						label="Pin to your profile"
					></TweetOption>
					<TweetOption
						icon={<RemoveFromListSVG />}
						label={`Add/remove @${author.username} from Lists`}
					></TweetOption>
					<TweetOption
						icon={<EmbedSVG />}
						label="Embed Tweet"
					></TweetOption>
					<TweetOption
						icon={<ActivitySVG />}
						label="View Tweet activity"
					></TweetOption>
				</SelftTweetModal>
			)}
		</AnimatePresence>
	);
});
