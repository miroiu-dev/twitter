import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { MouseEventHandler, ReactNode } from 'react';
import { useModalScrollbar } from '../../hooks/useModalScrollbar';

const modalroot = document.getElementById('modal-root');

const StopEvents: React.FC<{
	children: ReactNode;
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}> = ({ children, className, onClick }) => {
	return (
		<div
			className={className}
			onClick={ev => {
				ev.stopPropagation();
				if (onClick) {
					onClick(ev);
				}
			}}
		>
			{children}
		</div>
	);
};

const ModalWrapper = styled(StopEvents)`
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
	position: fixed;
`;

const ModalContent = styled(StopEvents)`
	position: absolute;
	top: 5%;
	max-width: 600px;
	width: 100%;
	background-color: #000;
	border-radius: 1rem;
	padding: 0 1rem;
	@media (max-width: 657px) {
		top: 0;
		height: 100vh;
	}
`;

export const BaseModal: React.FC<{
	children: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}> = ({ children, isOpen, onClose }) => {
	useModalScrollbar(isOpen);
	return isOpen
		? createPortal(
				<ModalWrapper onClick={onClose}>
					{<ModalContent>{children}</ModalContent>}
				</ModalWrapper>,
				modalroot!
		  )
		: null;
};
