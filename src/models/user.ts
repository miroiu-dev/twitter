export type User = {
	username: string;
	phone: string;
	email: string;
	dateOfBirth: {
		month: string;
		day: number;
		year: string;
	};
};
