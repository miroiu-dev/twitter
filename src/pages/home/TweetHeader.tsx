import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
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
		id?: string;
		name: string;
		username: string;
		profilePicture?: string;
	};
	date: string;
	openModal?: () => void;
	user?: User;
	reference?: React.MutableRefObject<HTMLDivElement | null>;
	isShowing?: boolean;
	openDeletionModal?: () => void;
	closeModal?: () => void;
	hideButton?: boolean;
};

export const TweetHeader = forwardRef<HTMLDivElement, TweetHeaderProps>(
	(
		{
			author,
			date,
			openModal,
			user,
			isShowing,
			openDeletionModal,
			closeModal,
			hideButton,
		},
		ref
	) => {
		return (
			<TweetHeaderWrapper>
				<TweetInfo author={author} date={date} />
				{!hideButton && (
					<HeightWrapper onClick={ev => ev.stopPropagation()}>
						<Wrapper onClick={openModal}>
							<DotsSVG></DotsSVG>
						</Wrapper>

						{author.username !== user!.username ? (
							<TweetOptionsModalUser
								author={author}
								ref={ref}
								show={isShowing!}
							/>
						) : (
							<TweetOptionsModalSelf
								author={author}
								ref={ref!}
								show={isShowing!}
								callback={openDeletionModal!}
								secondaryCallback={closeModal}
							/>
						)}
					</HeightWrapper>
				)}
			</TweetHeaderWrapper>
		);
	}
);
