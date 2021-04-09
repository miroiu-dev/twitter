import styled from '@emotion/styled/macro';
import TwitterSvg from '../../components/icons/TwitterSvg';
import { TwitterInput } from '../../components/input/TwitterInput';
import { Title, Wrapper } from './Atoms';
import { TwitterButton } from '../../components/buttons/TwitterButton';

const Form = styled.form``;
const InputWrapper = styled.div`
	margin: 0.75rem 0;
`;
export const LoginPage: React.FC = () => {
	return (
		<Wrapper>
			<TwitterSvg maxWidth="40px" fill="rgb(217, 217, 217)"></TwitterSvg>
			<Title>Log in to Twitter</Title>
			<Form>
				<InputWrapper>
					<TwitterInput label="Phone, email, or username" />
				</InputWrapper>
				<InputWrapper>
					<TwitterInput label="Password" type="password" />
				</InputWrapper>
				<TwitterButton disabled type="submit">
					Log in{' '}
				</TwitterButton>
			</Form>
		</Wrapper>
	);
};
