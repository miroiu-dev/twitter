import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import {
	accountService,
	DateOfBirth,
	LoginResponse,
} from '../services/account.service';
import { UserContext } from './UserContext';

export const useAuth = () => {
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();

	const login = useCallback(
		async (username: string, password: string) => {
			if (user) {
				return { user: user } as LoginResponse;
			}

			const response = await accountService.login(username, password);

			if (response.user) {
				setUser(response.user);
				history.push('/feed');
			}

			return response;
		},
		[user, setUser, history]
	);

	const signup = useCallback(
		async (
			username: string,
			password: string,
			dateOfBirth: DateOfBirth
		) => {
			const response = await accountService.signup(
				username,
				password,
				dateOfBirth
			);

			if (response.user) {
				setUser(response.user);
				history.push('/feed');
			}

			return response;
		},
		[setUser, history]
	);

	return { user, login, signup };
};
