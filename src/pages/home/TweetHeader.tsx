import styled from '@emotion/styled/macro';
import React from 'react';
import { DotsSVG, IconWrapper } from '../../components/side-panel/Atoms';
import { User } from '../../models/User';
import { TweetInfo } from './TweetInfo';
import {
	TweetOptionsModalSelf,
	TweetOptionsModalUser,
} from './TweetOptionsModal';

export const Wrapper = styled(IconWrapper)`
	margin-top: -7px;
`;

export const HeightWrapper = styled.div`
	height: 20px;
	position: relative;
`;

const TweetHeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	height: 22px;
	margin-bottom: 2px;
`;

export type TweetHeaderProps = {
	author: {
		name: string;
		username: string;
		profilePicture: string;
	};
	date: string;
	openModal: () => void;
	user: User;
	reference: React.MutableRefObject<HTMLDivElement | null>;
	isShowing: boolean;
	openDeletionModal: () => void;
	closeModal: () => void;
};

export const TweetHeader: React.FC<TweetHeaderProps> = ({
	author,
	date,
	openModal,
	user,
	reference,
	isShowing,
	openDeletionModal,
	closeModal,
}) => {
	return (
		<TweetHeaderWrapper>
			<TweetInfo author={author} date={date} />
			<HeightWrapper onClick={ev => ev.stopPropagation()}>
				<Wrapper onClick={openModal}>
					<DotsSVG></DotsSVG>
				</Wrapper>
				{author.username !== user!.username ? (
					<TweetOptionsModalUser
						author={author}
						reference={reference}
						show={isShowing}
					/>
				) : (
					<TweetOptionsModalSelf
						author={author}
						reference={reference}
						show={isShowing}
						callback={openDeletionModal}
						secondaryCallback={closeModal}
					/>
				)}
			</HeightWrapper>
		</TweetHeaderWrapper>
	);
};
