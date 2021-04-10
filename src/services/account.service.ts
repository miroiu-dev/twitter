import axios, { AxiosError } from 'axios';
import { ApiError } from '../models/ApiError';
import { User } from '../models/user';
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
		const response = await axios.post<User | ApiError>(routes.login(), {
			username,
			password,
		});

		return { user: response.data as User };
	} catch (err) {
		const error = err as AxiosError;
		if (error.response) {
			const data = error.response.data as ApiError;
			if (data) {
				return { error: data.error };
			}
		}

		return { error: 'Something went wrong, try again later' };
	}
};

export const accountService = {
	login,
};
