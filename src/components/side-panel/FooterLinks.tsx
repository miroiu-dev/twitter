import { Link, LinkWrapper, TOSLinks } from './Atoms';

export const Links: React.FC = () => {
	return (
		<TOSLinks>
			<Link>Terms of Serivce</Link>
			<Link>Privacy Policy</Link>
			<Link>Cookie Policy</Link>
			<Link>Ads info</Link>
			<LinkWrapper>
				<Link padding="1px">More ...</Link>
			</LinkWrapper>
			<Link cursor="text" hover="none">
				&#169; 2021 Twitter, Inc.
			</Link>
		</TOSLinks>
	);
};
