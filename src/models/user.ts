export type User = {
	username: string;
	name: string;
	phone: string;
	email: string;
	profilePicture?: string;
	country?: string;
	dateOfBirth: {
		month: string;
		day: number;
		year: string;
	};
};
