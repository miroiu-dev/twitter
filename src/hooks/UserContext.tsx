import axios, { AxiosResponse } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '../models/User';

type ContextType = {
	user?: User;
	setUser: (user?: User) => void;
};

export const UserContext = createContext<ContextType>({
	user: undefined,
	setUser: () => {},
});
const localUser: User | null = JSON.parse(
	localStorage.getItem('user') || 'null'
);
export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | undefined>(localUser || undefined);

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			r => r,
			err => {
				const response = err.response as AxiosResponse;
				if (response && response.status === 401) {
					setUser(undefined);
				}
				return Promise.reject(err);
			}
		);
		return () => axios.interceptors.response.eject(interceptor);
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
