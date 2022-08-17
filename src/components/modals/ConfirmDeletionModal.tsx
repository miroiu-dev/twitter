import styled from '@emotion/styled';
import { useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { TweetsContext } from '../../hooks/TweetsContext';
import { useModalScrollbar } from '../../hooks/useModalScrollbar';

const ModalWrapper = styled.div`
	background-color: rgba(91, 112, 131, 0.4);
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
`;

const ConfirmWrapper = styled.div`
	width: 320px;
	padding: 2rem 1.25rem;
	border-radius: 1rem;
	background-color: #000;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const HeaderText = styled.div`
	margin-bottom: 0.75rem;
	font-size: 1.25rem;
	font-weight: 700;
	text-align: center;
	color: rgb(217, 217, 217);
`;

const Description = styled.div`
	color: rgb(110, 118, 125);
	font-weight: 400;
	font-size: 0.938rem;
	overflow-wrap: break-word;
	text-align: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	margin-top: 1.25rem;
	justify-content: space-between;
`;

const Button = styled.button<{
	backgroundColor: string;
	hoverBackgroundColor: string;
}>`
	background-color: ${props => props.backgroundColor};
	min-width: calc(64.4px);
	min-height: 40px;
	padding-left: 1em;
	padding-right: 1em;
	border: 1px solid rgba(0, 0, 0, 0);
	border-radius: 9999px;
	font-size: 15px;
	font-weight: 700;
	color: rgb(217, 217, 217);
	flex-grow: 1;
	:first-of-type {
		margin-right: 1rem;
	}
	&:hover {
		background-color: ${props => props.hoverBackgroundColor};
	}
	transition: 200ms;
	cursor: pointer;
	outline: none;
`;

export const ConfirmDeletionModal: React.FC<{
	id?: string;
	closeModal: () => void;
	onDelete: (id: string) => void;
	redirect?: string;
	tweetId?: string;
}> = ({ id, closeModal, onDelete, redirect, tweetId }) => {
	const divRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const query = document.getElementById('modal-root');
	// useClickOutside(divRef, closeModal);
	const { decrementNumberOfComments } = useContext(TweetsContext);
	useModalScrollbar(true);
	return createPortal(
		<ModalWrapper>
			<ConfirmWrapper ref={divRef}>
				<Wrapper>
					<HeaderText>Delete Tweet?</HeaderText>
					<Description>
						This can’t be undone and it will be removed from your
						profile, the timeline of any accounts that follow you,
						and from Twitter search results.
					</Description>
					<ButtonWrapper>
						<Button
							backgroundColor="rgb(32, 35, 39)"
							hoverBackgroundColor="rgb(54, 57, 61)"
							onClick={closeModal}
						>
							Cancel
						</Button>
						<Button
							backgroundColor="rgb(224, 36, 94)"
							hoverBackgroundColor="rgb(202, 32, 85)"
							onClick={() => {
								if (tweetId) {
									decrementNumberOfComments(tweetId);
								}
								onDelete(id!);
								if (redirect) {
									navigate(redirect);
								}
								closeModal();
							}}
						>
							Delete
						</Button>
					</ButtonWrapper>
				</Wrapper>
			</ConfirmWrapper>
		</ModalWrapper>,
		query!
	);
};
