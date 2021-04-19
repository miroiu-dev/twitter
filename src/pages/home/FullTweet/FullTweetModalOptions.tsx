import { DotsSVG } from '../../../components/side-panel/Atoms';
import { useAuth } from '../../../hooks/useAuth';
import { useModal } from '../../../hooks/useModal';
import { Wrapper } from '../../registration/Atoms';
import { HeightWrapper } from '../TweetHeader';
import {
	TweetOptionsModalSelf,
	TweetOptionsModalUser,
} from '../TweetOptionsModal';
import { Author } from './Atoms';

export const TweetModalOptions: React.FC<{
	author: Author;
	openDeletionModal: () => void;
}> = ({ author, openDeletionModal }) => {
	const { openModal, ref, show, closeModal } = useModal();
	const { user } = useAuth();
	return (
		<HeightWrapper>
			<Wrapper onClick={openModal}>
				<DotsSVG></DotsSVG>
			</Wrapper>
			{author.username !== user!.username ? (
				<TweetOptionsModalUser author={author} ref={ref} show={show} />
			) : (
				<TweetOptionsModalSelf
					author={author}
					ref={ref}
					show={show}
					callback={openDeletionModal}
					secondaryCallback={closeModal}
				/>
			)}
		</HeightWrapper>
	);
};
