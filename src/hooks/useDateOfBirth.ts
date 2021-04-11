import { useCallback, useMemo, useReducer } from 'react';

export type Month =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';

const months: Optional<Month>[] = [
	'',
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const currentYear = new Date().getFullYear();
const years = [
	'',
	...Array.from({ length: 116 }).map((_, i) => currentYear - i),
];

const daysByMonth = new Map<Month, number>([
	['January', 31],
	['February', 29],
	['March', 31],
	['April', 30],
	['May', 31],
	['June', 30],
	['July', 31],
	['August', 31],
	['September', 30],
	['October', 31],
	['November', 30],
	['December', 31],
]);

const dateOfBirthReducer = (
	state: DateOfBirth,
	action: ActionType
): DateOfBirth => {
	switch (action.type) {
		case 'SET_MONTH':
			return {
				...state,
				month: action.value,
				numberOfDays: daysByMonth.get(action.value)!,
			};
		case 'SET_DAY':
			return { ...state, day: action.value };
		case 'SET_YEAR':
			return { ...state, year: action.value };
	}
};

type Optional<T> = T | '';

type SetMonthAction = {
	type: 'SET_MONTH';
	value: Month;
};

type SetDayOrYearAction = {
	type: 'SET_DAY' | 'SET_YEAR';
	value: number;
};

type ActionType = SetMonthAction | SetDayOrYearAction;

type DateOfBirth = {
	month: Optional<Month>;
	day: Optional<number>;
	year: Optional<number>;
	numberOfDays: number;
};

export const useDateOfBirth = (initial?: DateOfBirth) => {
	const [state, dispatch] = useReducer(
		dateOfBirthReducer,
		initial || {
			month: '',
			day: '',
			year: '',
			numberOfDays: 31,
		}
	);
	const days = useMemo(
		() => [
			'',
			...Array.from({ length: state.numberOfDays }).map((_, i) => i + 1),
		],
		[state.numberOfDays]
	);

	const setMonth = useCallback((value: Month) => {
		dispatch({
			type: 'SET_MONTH',
			value: value,
		});
	}, []);

	const setDay = useCallback((value: number) => {
		dispatch({
			type: 'SET_DAY',
			value: value,
		});
	}, []);

	const setYear = useCallback((value: number) => {
		dispatch({
			type: 'SET_YEAR',
			value: value,
		});
	}, []);

	return {
		month: state.month,
		day: state.day,
		year: state.year,
		daysInMonth: days,
		monthsInYear: months,
		yearsRange: years,
		setMonth,
		setDay,
		setYear,
	};
};
