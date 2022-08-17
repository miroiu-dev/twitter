import styled from '@emotion/styled';
import { forwardRef } from 'react';

const Input = styled.input`
	width: 100%;
	height: 100%;
	padding-top: 10px;
	border: none;
	outline: none;
	background-color: #000;
	font-size: 1.063rem;
	color: #fff;
	font-weight: 400;
`;

const Label = styled.label`
	position: absolute;
	bottom: 0px;
	width: 100%;
	height: 100%;
	font-size: 1.25rem;
	pointer-events: none;
	border-bottom: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Span = styled.span`
	position: absolute;
	left: 0px;
	transition: all 0.2s ease;
	color: rgb(110, 118, 125);
`;

const InputWrapper = styled.div`
	width: 100%;
	position: relative;
	height: 50px;
	overflow: hidden;
	border: 1px solid rgb(47, 51, 54);
	background-color: #000;
	padding-left: 6px;
	border-radius: 4px;
	box-sizing: border-box;
	${Input}:focus + ${Label} ${Span},
    ${Input}:valid + ${Label} ${Span} {
		transform: translateY(-70%);
		font-size: 14px;
		color: rgb(29, 161, 242);
	}

	&:focus-within {
		border: 2px solid rgb(29, 161, 242);
	}
`;

export const TwitterInput = forwardRef<
	HTMLInputElement,
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & { label: string }
>(({ label, ...rest }, ref) => {
	return (
		<InputWrapper>
			<Input required autoComplete="off" {...rest} ref={ref} />
			<Label htmlFor={rest.id}>
				<Span>{label}</Span>
			</Label>
		</InputWrapper>
	);
});
