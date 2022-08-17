import styled from '@emotion/styled';
import React, { FormEvent, useContext, useRef, useState } from 'react';
import { IconWrapper } from '../../components/side-panel/Atoms';
import { useAuth } from '../../hooks/useAuth';
import {
	CalendarIcon,
	CreateTweetWrapper,
	EmojiIcon,
	GridColumn,
	GridRow,
	PollIcon,
	ProfilePicture,
	ProfilePictureWrapper,
	TweetButton,
	TweetInput,
	TweetInputWrapper,
	TweetOptions,
	TweetOptionsWrapper,
	UploadGIFIcon,
	UploadImageIcon,
	CreateTweetContent,
} from './Atoms';
import { ContentVisiblity } from './ContentVisiblity';
import { ImageOptions } from './ImageOptions';
import { TweetsContext } from '../../hooks/TweetsContext';

const IconWrapperLabel = IconWrapper.withComponent('label');

const ImageUploadInput = styled.input``;

const EmojiPickerWrapper = styled(IconWrapperLabel)`
	position: relative;
`;

// const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
// 	navigator.userAgent
// );

export const CreateTweet: React.FC<{
	contentPadding?: string;
	visibilityHidden?: boolean;
	inputMinHeight?: string;
	buttonName?: string;
	hideBorderBottom?: boolean;
	callback?: (message: string, attachement: string) => void;
}> = ({
	contentPadding,
	visibilityHidden,
	inputMinHeight,
	buttonName,
	hideBorderBottom,
	callback,
}) => {
	const { user } = useAuth();
	const [text, setText] = useState('');
	const [image, setImage] = useState<string | ArrayBuffer | null>(null);
	const [isShown, setIsShown] = useState(false);
	const inputText = useRef<HTMLDivElement>(null);
	const showTweetVisiblityOption = () => {
		setIsShown(true);
	};

	const handleImageUpload = (ev: FormEvent<HTMLLabelElement>) => {
		const reader = new FileReader();
		const target = ev.target as HTMLInputElement;
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
			}
		};
		reader.readAsDataURL(target.files![0]);
		target.value = '';
	};

	const removeImage = () => {
		setImage(null);
	};

	const { createTweet } = useContext(TweetsContext);
	return (
		<CreateTweetWrapper hideBorderBottom={hideBorderBottom}>
			<CreateTweetContent contentPadding={contentPadding}>
				<GridColumn>
					<ProfilePictureWrapper to="/profile">
						<ProfilePicture src={user?.profilePicture} />
					</ProfilePictureWrapper>
					<GridRow>
						<TweetInputWrapper>
							<TweetInput
								ref={inputText}
								contentEditable
								data-placeholder="What's happening?"
								onInput={(ev: FormEvent<HTMLDivElement>) => {
									setText(inputText.current?.innerHTML!);
								}}
								onClick={() =>
									!visibilityHidden &&
									showTweetVisiblityOption
								}
								inputMinHeight={inputMinHeight}
								shouldNotKeepMinHeight={image ? true : false}
								onDragEnter={ev => {
									ev.preventDefault();
									ev.dataTransfer.dropEffect = 'none';
								}}
								onDragOver={ev => {
									ev.preventDefault();
									ev.dataTransfer.dropEffect = 'none';
								}}
								onPaste={ev => {
									ev.preventDefault();
									const text =
										ev.clipboardData.getData('text/plain');
									document.execCommand(
										'insertText',
										false,
										text
									);
								}}
							></TweetInput>
						</TweetInputWrapper>
						{image && (
							<ImageOptions
								image={image as string}
								callback={removeImage}
							/>
						)}
						{!visibilityHidden && (isShown || image) && (
							<ContentVisiblity />
						)}
						<TweetOptionsWrapper>
							<TweetOptions>
								<IconWrapperLabel onChange={handleImageUpload}>
									<ImageUploadInput
										type="file"
										accept="image/*"
										hidden
									/>
									<UploadImageIcon />
								</IconWrapperLabel>
								<IconWrapperLabel>
									<UploadGIFIcon />
								</IconWrapperLabel>
								<IconWrapperLabel>
									<PollIcon />
								</IconWrapperLabel>
								<EmojiPickerWrapper>
									<EmojiIcon />
								</EmojiPickerWrapper>
								<IconWrapperLabel>
									<CalendarIcon />
								</IconWrapperLabel>
							</TweetOptions>
							<TweetButton
								disabled={!text}
								onClick={() => {
									const result = text
										.replaceAll('<div>', '\n')
										.replaceAll('</div>', '')
										.replaceAll('&nbsp;', ' ')
										.replaceAll('<br>', '\n')!;

									if (callback) {
										callback(
											result.trim(),
											image as string
										);
									} else {
										createTweet(
											result.trim(),
											image as string
										);
									}
									removeImage();
									if (inputText.current) {
										inputText.current.textContent = '';
										setText('');
									}
								}}
							>
								{buttonName || 'Tweet'}
							</TweetButton>
						</TweetOptionsWrapper>
					</GridRow>
				</GridColumn>
			</CreateTweetContent>
		</CreateTweetWrapper>
	);
};
