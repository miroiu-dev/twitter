import {
	EveryoneSVG,
	Visbility,
	VisibilityContent,
	VisiblityWrapper,
} from './Atoms';

export const ContentVisiblity: React.FC = () => {
	return (
		<VisiblityWrapper>
			<VisibilityContent>
				<EveryoneSVG></EveryoneSVG>
				<Visbility>Everyone can reply</Visbility>
			</VisibilityContent>
		</VisiblityWrapper>
	);
};
