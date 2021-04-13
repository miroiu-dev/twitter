import { useCallback, useEffect, useState } from 'react';
import { peopleService, Person } from '../services/people.service';

export const useSearchResults = (searchText: string) => {
	const [results, setResults] = useState<Person[]>([]);

	const search = useCallback(async (text: string) => {
		try {
			const result = await peopleService.search(text);
			setResults(result);
		} catch (err) {}
	}, []);

	useEffect(() => {
		if (searchText.trim()) {
			const timerId = setTimeout(() => search(searchText), 300);
			return () => clearTimeout(timerId);
		} else {
			setResults([]);
		}
	}, [search, searchText]);
	return results;
};
