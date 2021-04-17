export const monthsMap = new Map([
	[1, 'Jan'],
	[2, 'Feb'],
	[3, 'Mar'],
	[4, 'Apr'],
	[5, 'May'],
	[6, 'Jun'],
	[7, 'Jul'],
	[8, 'Aug'],
	[9, 'Sep'],
	[10, 'Oct'],
	[11, 'Nov'],
	[12, 'Dec'],
]);

export const getReadableDate = (createdAt: Date) => {
	const now = new Date();

	const seconds = now.getSeconds() - createdAt.getSeconds();
	const minutes = now.getMinutes() - createdAt.getMinutes();
	const hours = now.getHours() - createdAt.getHours();
	const days = now.getDay() - createdAt.getDay();
	const months = now.getMonth() - createdAt.getMonth();
	const years = now.getFullYear() - createdAt.getFullYear();

	let year = '';
	let month = '';
	let day = '';

	if (years > 0) {
		year = `, ${createdAt.getFullYear()}`;
	}

	if (months > 0 || years > 0) {
		month = `${monthsMap.get(createdAt.getMonth())} `;
		day = createdAt.getDay().toString();
	} else if (days > 0) {
		day = `${days}d`;
	} else if (hours > 0) {
		day = `${hours}h`;
	} else if (minutes > 0) {
		day = `${minutes}m`;
	} else if (seconds > 3) {
		day = `${seconds}s`;
	} else {
		day = `Now`;
	}

	return `${month}${day}${year}`;
};
