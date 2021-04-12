import axios from 'axios';
import { routes } from './routes';

export type Person = {
	name: string;
	username: string;
	profilePicture: string;
};

const search = async (text: string): Promise<Person[]> => {
	try {
		const uri = encodeURI(routes.people(text));
		const response = await axios.get<Person[]>(uri);
		return response.data;
	} catch (err) {
		return [];
	}
};

export const peopleService = {
	search,
};
