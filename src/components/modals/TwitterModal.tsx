import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { CloseX } from '../icons/CloseX';
import { IconWrapper } from '../side-panel/Atoms';
import { BaseModal } from './BaseModal';

const ModalHeader = styled.div`
	height: 53px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgb(47, 51, 54);
	background-color: #000;
`;

const CloseXSVG = styled(CloseX)`
	width: 1.5em;
	height: 1.5em;
	fill: rgba(29, 161, 242, 1);
	font-size: 0.938rem;
`;

export const TwitterModal: React.FC<{
	children: ReactNode;
	onClose: () => void;
	isOpen: boolean;
}> = ({ children, isOpen, onClose }) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<ModalHeader>
				<IconWrapper onClick={onClose}>
					<CloseXSVG />
				</IconWrapper>
			</ModalHeader>
			{children}
		</BaseModal>
	);
};
