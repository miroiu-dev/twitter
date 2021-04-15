import { ResponsiveImage } from '../../components/ResponsiveImage';
import {
	Controls,
	EditWrapper,
	ListSVG,
	Options,
	OptionTitle,
	OptionWrapper,
	PersonSVG,
	RemoveSVG,
	RemoveSVGWrapper,
	UploadedImage,
} from './Atoms';

export const ImageOptions: React.FC<{
	image?: string;
	callback?: () => void;
}> = ({ image, callback }) => {
	return (
		<UploadedImage>
			<ResponsiveImage src={image}>
				<Controls>
					<RemoveSVGWrapper onClick={callback}>
						<RemoveSVG />
					</RemoveSVGWrapper>
					<EditWrapper>Edit</EditWrapper>
				</Controls>
			</ResponsiveImage>
			<Options>
				<OptionWrapper>
					<PersonSVG />
					<OptionTitle>Tag people</OptionTitle>
				</OptionWrapper>
				<OptionWrapper>
					<ListSVG />
					<OptionTitle>Add description</OptionTitle>
				</OptionWrapper>
			</Options>
		</UploadedImage>
	);
};
