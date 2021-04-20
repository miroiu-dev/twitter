import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

export const useModal = () => {
	const [isShowing, setIsShowing] = useState(false);

	const divRef = useRef<HTMLDivElement | null>(null);

	const openModal = () => {
		setIsShowing(true);
	};

	const closeModal = () => {
		setIsShowing(false);
	};

	useEffect(() => {
		if (isShowing) {
			document.getElementById('root')!.style.pointerEvents = 'none';
		}

		return () => {
			document.getElementById('root')!.style.pointerEvents = 'all';
		};
	}, [isShowing]);

	useClickOutside(divRef, closeModal);
	return { openModal, closeModal, show: isShowing, ref: divRef };
};
