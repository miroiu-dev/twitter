import axios, { AxiosError } from 'axios';
import { ApiError } from '../models/ApiError';
import { User } from '../models/User';
import { routes } from './routes';

export type LoginResponse = {
	user?: User;
	error?: string;
};

const login = async (
	username: string,
	password: string
): Promise<LoginResponse> => {
	try {
		const response = await axios.post<User>(
			routes.login(),
			{
				username,
				password,
			},
			{ withCredentials: true }
		);

		return { user: response.data };
	} catch (err) {
		const error = err as AxiosError;
		console.log(err);
		if (error.response && error.response.status !== 404) {
			const data = error.response.data as ApiError;
			if (data) {
				return { error: data.error };
			}
		}

		return { error: 'Something went wrong, try again later' };
	}
};

export type DateOfBirth = {
	month: string;
	day: number;
	year: number;
};

const signup = async (
	username: string,
	password: string,
	dateOfBirth: DateOfBirth
) => {
	try {
		const response = await axios.post<User>(
			routes.signup(),
			{
				username,
				password,
				dateOfBirth,
			},
			{ withCredentials: true }
		);

		return { user: response.data };
	} catch (err) {
		const error = err as AxiosError;
		if (error.response && error.response.status !== 404) {
			const data = error.response.data as ApiError;

			if (data) {
				return { error: data.error };
			}
		}
		return { error: 'Something went wrong, try again later' };
	}
};

export const logout = async () => {
	try {
		await axios.post(routes.logout(), {}, { withCredentials: true });
	} catch (err) {
		return { error: 'Something went wrong, try again later' };
	}
};

export const accountService = {
	login,
	logout,
	signup,
};
