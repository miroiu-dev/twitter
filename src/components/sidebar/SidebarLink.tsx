import styled, { StyledComponent } from '@emotion/styled';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export type StyledComponentType = StyledComponent<{
	className?: string;
}>;

const Wrapper = styled.div<{ isActive: boolean }>`
	display: flex;
	width: fit-content;
	padding: 0.75rem;
	transition: 200ms;
	border-radius: 9999px;
	color: ${props =>
		props.isActive ? 'rgba(29, 161, 242, 1)' : 'rgb(217, 217, 217)'};
	fill: ${props =>
		props.isActive ? 'rgba(29, 161, 242, 1)' : 'rgb(217, 217, 217)'};
`;

const Label = styled.span`
	margin-left: 1.25rem;
	margin-right: 0.75rem;
	font-size: 1.25rem;
	font-weight: 700;
	transition: 200ms;
`;

type NavigationItemProps = {
	icon: StyledComponentType;
	iconFilled: StyledComponentType;
	label?: string;
	path: string;
};

export const SidebarLink: React.FC<NavigationItemProps> = ({
	icon,
	iconFilled,
	label,
	path,
}) => {
	const route = useLocation();
	const Icon = icon;
	const IconFilled = iconFilled;
	const isActive = route.pathname === path;

	const StyledLink = useMemo(
		() => styled(Link)`
			text-decoration: none;
			padding: 4px 0;
			&:hover ${Wrapper} {
				background-color: rgba(29, 161, 242, 0.1);
			}
			&:hover ${Icon} {
				fill: rgba(29, 161, 242, 1);
			}
			&:hover ${Label} {
				color: rgba(29, 161, 242, 1);
			}
		`,
		[Icon]
	);

	return (
		<StyledLink to={path}>
			<Wrapper isActive={isActive}>
				{isActive ? <IconFilled /> : <Icon />}
				{label && <Label>{label}</Label>}
			</Wrapper>
		</StyledLink>
	);
};
