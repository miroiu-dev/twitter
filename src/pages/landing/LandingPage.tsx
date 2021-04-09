import React from 'react';
import { TwitterLink } from '../../components/buttons/TwitterButton';
import TwitterSvg from '../../components/icons/TwitterSvg';
import {
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
							<TwitterLink to="/signup">Sign up</TwitterLink>
							<TwitterLink to="/login" isPrimary>
								Log in
							</TwitterLink>
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
