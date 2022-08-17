import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { Quote } from '../icons/Quote';
import { Retweet } from '../icons/TweetInteraction';

const RetweetModalWrapper = styled(motion.div)`
	position: absolute;
	top: 10px;
	right: 0;
	width: 160.02px;
	height: 104px;
	background-color: #000;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
	z-index: 10;
	pointer-events: all;
`;

const BaseIcon = styled.svg`
	margin-right: 0.75rem;
	fill: rgb(110, 118, 125);
	width: 1.25em;
	height: 1.25em;
`;

const Option = styled.div`
	transition: 200ms;
	padding: 1rem;
	display: flex;
	&:hover {
		background-color: rgba(255, 255, 255, 0.03);
	}
`;

const Label = styled.span`
	font-weight: 400;
	font-size: 0.938rem;
	color: rgb(217, 217, 217);
`;

const RetweetSVG = BaseIcon.withComponent(Retweet);
const QuoteSVG = BaseIcon.withComponent(Quote);

type RetweetModalProps = {
	isRetweeted: boolean;
	callback: (id: string) => void;
	closeModal: () => void;
	tweetId: string;
};

export const RetweetModal = forwardRef<HTMLDivElement, RetweetModalProps>(
	({ callback, isRetweeted, tweetId, closeModal }, ref) => {
		return (
			<RetweetModalWrapper
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
				<Option
					onClick={() => {
						closeModal();
						callback(tweetId);
					}}
				>
					<RetweetSVG />

					<Label>{isRetweeted ? 'Undo Retweet' : 'Retweet'}</Label>
				</Option>
				<Option>
					<QuoteSVG />
					<Label>Quote Tweet</Label>
				</Option>
			</RetweetModalWrapper>
		);
	}
);
