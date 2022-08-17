import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	accountService,
	DateOfBirth,
	LoginResponse,
} from '../services/account.service';
import { UserContext } from './UserContext';

const CountriesByName = new Map([
	['RO', 'Romania'],
	['UK', 'United Kingdom'],
	['US', 'United States'],
]);

export const useAuth = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const login = useCallback(
		async (username: string, password: string) => {
			if (user) {
				return { user: user } as LoginResponse;
			}

			const response = await accountService.login(username, password);
			const country = CountriesByName.get(response.user?.country!);
			if (response.user) {
				setUser({ ...response.user, country: country });
				navigate('/home');
			}

			return response;
		},
		[user, setUser, history]
	);

	const logout = useCallback(async () => {
		const response = await accountService.logout();
		if (response?.error) {
			console.log(response.error);
		} else {
			setUser(undefined);
		}
	}, [setUser]);

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
			const country = CountriesByName.get(response.user?.country!);
			if (response.user) {
				setUser({ ...response.user, country: country });
				localStorage.setItem('user', JSON.stringify(response.user));
				navigate('/home');
			}

			return response;
		},
		[setUser, history]
	);

	return { user, login, logout, signup };
};
