import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useClickOutside = (
	ref: MutableRefObject<HTMLDivElement | null | undefined>,
	callback: () => void
) => {
	const callbackRef = useRef(callback);

	useEffect(() => (callbackRef.current = callback), [callback]);

	const handleClick = useCallback(
		(ev: MouseEvent) => {
			if (ref.current && !ref.current.contains(ev.target! as Node)) {
				callbackRef.current();
			}
		},
		[ref]
	);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [handleClick]);
};
