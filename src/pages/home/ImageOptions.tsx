import {
	Controls,
	EditWrapper,
	ImageWrapper,
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
			<ImageWrapper draggable={false} url={image}>
				<Controls>
					<RemoveSVGWrapper onClick={callback}>
						<RemoveSVG />
					</RemoveSVGWrapper>
					<EditWrapper>Edit</EditWrapper>
				</Controls>
			</ImageWrapper>
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
