import { useState, useEffect } from 'react';

const useRepositories = () => {
	const [repositories, setRepositories] = useState();
	const [loading, setLoading] = useState(false);
	
	const baseURL = 'http://192.168.1.101:5000/api/repositories';

	const fetchRepositories = async () => {
		setLoading(true);

		const res = await fetch(baseURL);
		const data = await res.json();
		
		setLoading(false);
		setRepositories(data);
	};

	useEffect(() => {
		fetchRepositories();
	}, []);

	return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;