import { useCallback, useRef, useState } from 'react';
import { DotsSVG } from '../../../components/side-panel/Atoms';
import { useAuth } from '../../../hooks/useAuth';
import { useClickOutside } from '../../../hooks/useClickOutside';
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
	const [shouldOpen, setShouldOpen] = useState(false);
	const div = useRef<HTMLDivElement | null>(null);
	const show = useCallback(() => setShouldOpen(!shouldOpen), [
		shouldOpen,
		setShouldOpen,
	]);
	useClickOutside(div, show);
	const { user } = useAuth();
	return (
		<HeightWrapper>
			<Wrapper onClick={show}>
				<DotsSVG></DotsSVG>
			</Wrapper>
			{author.username !== user!.username ? (
				<TweetOptionsModalUser
					author={author}
					ref={div}
					show={shouldOpen}
				/>
			) : (
				<TweetOptionsModalSelf
					author={author}
					ref={div}
					show={shouldOpen}
					callback={openDeletionModal}
					secondaryCallback={show}
				/>
			)}
		</HeightWrapper>
	);
};
