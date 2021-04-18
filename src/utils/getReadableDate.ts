export const monthsMap = new Map([
	[0, 'Jan'],
	[1, 'Feb'],
	[2, 'Mar'],
	[3, 'Apr'],
	[4, 'May'],
	[5, 'Jun'],
	[6, 'Jul'],
	[7, 'Aug'],
	[8, 'Sep'],
	[9, 'Oct'],
	[10, 'Nov'],
	[11, 'Dec'],
]);

export const getReadableDate = (createdAt: Date) => {
	const now = new Date();

	const seconds = now.getSeconds() - createdAt.getSeconds();
	const minutes = now.getMinutes() - createdAt.getMinutes();
	const hours = now.getHours() - createdAt.getHours();
	const days = now.getDate() - createdAt.getDate();
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
		day = createdAt.getDate().toString();
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
