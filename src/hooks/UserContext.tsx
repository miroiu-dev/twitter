import { createContext, useState } from 'react';
import { User } from '../models/user';

type ContextType = {
	user?: User;
	setUser: (user: User) => void;
};

export const UserContext = createContext<ContextType>({
	user: undefined,
	setUser: () => {},
});
const localUser: User | null = JSON.parse(
	localStorage.getItem('user') || 'null'
);
export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(localUser || undefined);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
