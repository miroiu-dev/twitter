import styled from '@emotion/styled';
import { useAuth } from '../../hooks/useAuth';
import { UserInfo } from '../user/UserInfo';
import { Checkmark } from '../icons/Checkmark';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';

const UserInfoModal = styled(motion.div)<{
	bottom?: string;
	left?: string;
	arrowTop?: string;
	arrowLeft?: string;
}>`
	user-select: none;
	pointer-events: all !important;
	position: relative;
	transition: 200ms;
	width: 300px;
	background-color: #000;
	color: #fff;
	border-radius: 6px;
	padding: 0.75rem 0;
	border-radius: 1rem;
	box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
		rgb(255 255 255 / 15%) 0px 0px 3px 1px;
	box-sizing: border-box;

	/* Position the tooltip */

	position: absolute;
	z-index: 1;
	border: 1px solid rgb(47, 51, 54);
	&::after {
		content: ' ';
		position: absolute;
		top: ${props => props.arrowTop ?? '100%'};
		left: ${props => props.arrowLeft ?? ' 50%'};
		transform: rotate(180deg);
		margin-left: -7px;
		border-width: 7px;
		border-style: solid;
		border-color: transparent transparent black transparent;
		filter: drop-shadow(rgb(47, 51, 54) 1px -1px 1px);
	}

	bottom: ${props => props.bottom ?? '86px'};
	left: ${props => props.left ?? '20%'};
	margin-left: -60px;
`;

const UserOption = styled.div`
	padding: 1rem;
	user-select: none;
	cursor: pointer;
	transition: 200ms;
	font-size: 0.938rem;
	border: 1px solid rgb(47, 51, 54);
	color: rgb(217, 217, 217);
	&:hover {
		background-color: rgb(21, 24, 28);
	}
	&:last-of-type {
		border-bottom: 0px;
	}
`;

const CheckmarkSVG = styled(Checkmark)`
	fill: rgba(29, 161, 242, 1);
	height: 1.25em;
`;
export const UserOptionsModal = forwardRef<
	HTMLDivElement,
	{
		show: boolean;
		modalBottom?: string;
		modalLeft?: string;
		arrowTop?: string;
		arrowLeft?: string;
	}
>(({ show, modalBottom, modalLeft, arrowTop, arrowLeft }, ref) => {
	const { user, logout } = useAuth();

	return (
		<AnimatePresence>
			{show && (
				<UserInfoModal
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					ref={ref}
					bottom={modalBottom}
					left={modalLeft}
					arrowLeft={arrowLeft}
					arrowTop={arrowTop}
				>
					<UserInfo
						padding="0 0.75rem"
						backgroundColorHover={false}
						icon={<CheckmarkSVG />}
					/>
					<UserOption>Add an existing account</UserOption>
					<UserOption onClick={logout}>
						Log out
						{' @' +
							user?.username.split(' ').join('_').toLowerCase()}
					</UserOption>
				</UserInfoModal>
			)}
		</AnimatePresence>
	);
});
