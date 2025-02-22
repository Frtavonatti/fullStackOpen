import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	const { data, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	});

	return { repositories: data?.repositories, loading };
};

export default useRepositories;