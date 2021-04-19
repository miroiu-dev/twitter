import { useEffect } from 'react';

export const useModalScrollbar = (isVisible: boolean) => {
	useEffect(() => {
		if (isVisible) {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			const scrollLeft =
				window.pageXOffset || document.documentElement.scrollLeft;
			const onscroll = () => {
				window.scrollTo(scrollLeft, scrollTop);
			};
			window.addEventListener('scroll', onscroll);
			document.body.classList.add('modal');
			return () => {
				window.removeEventListener('scroll', onscroll);
				document.body.classList.remove('modal');
			};
		}
	}, [isVisible]);
};
