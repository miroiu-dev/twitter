import React from 'react';
import TwitterSvg from '../../components/icons/TwitterSvg';
import {
	AuthButton,
	AuthScreenWrapper,
	AuthWrapper,
	ButtonWrapper,
	ContentWrapper,
	DecorationWrapper,
	InspirationalHeadline,
	Join,
	NavigationLink,
	NavigationLinks,
	RowsLayout,
	StyledTwitterSvg,
} from './Atoms';

export const LandingPage: React.FC = () => {
	return (
		<AuthScreenWrapper>
			<RowsLayout>
				<DecorationWrapper>
					<StyledTwitterSvg maxWidth="360px"></StyledTwitterSvg>
				</DecorationWrapper>
				<AuthWrapper>
					<ContentWrapper>
						<TwitterSvg
							maxWidth="50px"
							paddingBottom="16px"
							fill="rgb(217, 217, 217)"
						></TwitterSvg>
						<InspirationalHeadline>
							Happening now
						</InspirationalHeadline>
						<Join>Join Twitter today.</Join>
						<ButtonWrapper>
							<AuthButton to="/signup">Sign up</AuthButton>
							<AuthButton to="/login" isPrimary>
								Log in
							</AuthButton>
						</ButtonWrapper>
					</ContentWrapper>
				</AuthWrapper>
			</RowsLayout>
			<NavigationLinks>
				<NavigationLink>About</NavigationLink>
				<NavigationLink>Help Center</NavigationLink>
				<NavigationLink>Terms of Service</NavigationLink>
				<NavigationLink>Privacy Policy</NavigationLink>
				<NavigationLink>Cookie Policy</NavigationLink>
				<NavigationLink>Ads info</NavigationLink>
				<NavigationLink>Blog</NavigationLink>
				<NavigationLink>Status</NavigationLink>
				<NavigationLink>Careers</NavigationLink>
				<NavigationLink>Brand Resources</NavigationLink>
				<NavigationLink>Advertising</NavigationLink>
				<NavigationLink>Marketing</NavigationLink>
				<NavigationLink>Twitter for Business</NavigationLink>
				<NavigationLink>Developers</NavigationLink>
				<NavigationLink>Directory</NavigationLink>
				<NavigationLink>Settings</NavigationLink>
				<NavigationLink>&#169; 2021 Twitter, Inc.</NavigationLink>
			</NavigationLinks>
		</AuthScreenWrapper>
	);
};
