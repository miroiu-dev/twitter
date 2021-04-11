import { FormEvent, useEffect, useRef, useState } from 'react';
import TwitterSvg from '../../components/icons/TwitterSvg';
import { TwitterInput } from '../../components/input/TwitterInput';
import { useAuth } from '../../hooks/useAuth';
import {
	AuthLink,
	Dot,
	FlexWrapper,
	Form,
	IconWrapper,
	InputWrapper,
	LoginButton,
	Title,
	Wrapper,
	ErrorMessage,
} from './Atoms';

export const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useAuth();

	const handleLogin = async (ev: FormEvent) => {
		ev.preventDefault();
		const response = await login(username, password);

		if (response.error) {
			setError(response.error);
		}
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<Wrapper>
			<IconWrapper>
				<TwitterSvg
					maxWidth="40px"
					fill="rgb(217, 217, 217)"
				></TwitterSvg>
			</IconWrapper>
			<Title>Log in to Twitter</Title>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form onSubmit={handleLogin}>
				<InputWrapper>
					<TwitterInput
						label="Phone, email, or username"
						value={username}
						onChange={ev => setUsername(ev.target.value)}
						ref={inputRef}
					/>
				</InputWrapper>
				<InputWrapper>
					<TwitterInput
						label="Password"
						type="password"
						value={password}
						onChange={ev => setPassword(ev.target.value)}
					/>
				</InputWrapper>
				<LoginButton disabled={!username || !password} type="submit">
					Log in
				</LoginButton>
			</Form>
			<FlexWrapper>
				<AuthLink to="/reset">Forgot password? </AuthLink>
				<Dot>·</Dot>
				<AuthLink to="/signup">Sign up for Twitter</AuthLink>
			</FlexWrapper>
		</Wrapper>
	);
};
