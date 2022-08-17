import styled from '@emotion/styled';
import { ArrowDown } from '../icons/ArrowDown';

const Arrow = styled(ArrowDown)`
	height: 1.5em;
	fill: rgb(110, 118, 125);
	position: absolute;
	top: 50%;
	right: 12px;
	margin-top: -0.75em;
	pointer-events: none;
`;

const Label = styled.div`
	color: rgb(110, 118, 125);
	position: absolute;
	font-size: 13px;
	padding: 0 4px;
`;

const Select = styled.select`
	margin-top: 20px;
	width: 100%;
	padding-top: 12px;
	padding-bottom: 4px;
	padding-left: 4px;
	padding-right: 4px;
	background-color: #000;
	color: #fff;
	outline: none;
	border: none;
	font-size: 17px;
	cursor: pointer;
`;

const SelectWrapper = styled.div`
	background-color: #000;
	position: relative;
	border: 1px solid rgb(47, 51, 54);
	border-radius: 4px;
	${Select} {
		appearance: none;
	}
	&:focus-within {
		border: 1px solid rgb(29, 161, 242);
	}
	&:focus-within ${Arrow} {
		fill: rgb(29, 161, 242);
	}
`;

export const Option = styled.option`
	&:hover {
		background-color: rgb(29, 161, 242);
	}
`;

export const TwitterSelect: React.FC<
	React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> & { label: string }
> = ({ label, children, className, ...rest }) => {
	return (
		<SelectWrapper className={className}>
			<Label>{label}</Label>
			<Select {...rest}>{children}</Select>
			<Arrow />
		</SelectWrapper>
	);
};
