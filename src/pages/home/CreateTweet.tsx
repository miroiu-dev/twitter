import styled from '@emotion/styled/macro';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { IconWrapper } from '../../components/side-panel/Atoms';
import { useAuth } from '../../hooks/useAuth';
import {
	CalendarIcon,
	CreateTweetWrapper,
	EmojiIcon,
	FlexRow,
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
import 'emoji-mart/css/emoji-mart.css';

const IconWrapperLabel = IconWrapper.withComponent('label');

const ImageUploadInput = styled.input``;

const EmojiPickerWrapper = styled(IconWrapperLabel)`
	position: relative;
`;

export const CreateTweet: React.FC = () => {
	const { user } = useAuth();
	const [text, setText] = useState('');
	const [isShown, setIsShown] = useState(false);
	const [image, setImage] = useState<string | ArrayBuffer | null>(null);

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

	//tbh i dont know what i am doing anymore
	useEffect(() => {
		const onKeyPress = (ev: KeyboardEvent) => {
			if (ev.key !== '8') {
				ev.preventDefault();
			}
		};
		if (text.length > 20) {
			inputText!.current!.addEventListener('keypress', onKeyPress);
		}
		return () =>
			inputText!.current?.removeEventListener('keypress', onKeyPress);
	}, [text.length]);

	return (
		<CreateTweetWrapper>
			<CreateTweetContent>
				<FlexRow>
					<ProfilePictureWrapper to="/profile">
						<ProfilePicture src={user?.profilePicture} />
					</ProfilePictureWrapper>

					<TweetInputWrapper>
						<TweetInput
							ref={inputText}
							contentEditable
							data-placeholder="What's happening?"
							onInput={() =>
								setText(inputText.current?.textContent!.trim()!)
							}
							onClick={showTweetVisiblityOption}
						></TweetInput>
					</TweetInputWrapper>
				</FlexRow>
				{image && (
					<ImageOptions
						image={image as string}
						callback={removeImage}
					/>
				)}
				{(isShown || image) && <ContentVisiblity />}
				<TweetOptionsWrapper>
					<TweetOptions>
						<IconWrapperLabel
							htmlFor="image-upload"
							onChange={handleImageUpload}
						>
							<ImageUploadInput
								type="file"
								id="image-upload"
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
					<TweetButton disabled={!text}>Tweet</TweetButton>
				</TweetOptionsWrapper>
			</CreateTweetContent>
		</CreateTweetWrapper>
	);
};
