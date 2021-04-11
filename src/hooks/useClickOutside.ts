import { MutableRefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (
	ref: MutableRefObject<HTMLDivElement | null | undefined>,
	callback: () => void
) => {
	const handleClick = useCallback(
		(ev: MouseEvent) => {
			if (ref.current && !ref.current.contains(ev.target! as Node)) {
				callback();
			}
		},
		[callback, ref]
	);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [handleClick]);
};
