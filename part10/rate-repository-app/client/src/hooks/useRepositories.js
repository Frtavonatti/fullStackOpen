import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection) => {
	const { data, loading } = useQuery(GET_REPOSITORIES, {
		variables: {
			orderBy,
			orderDirection,
		},
		fetchPolicy: 'cache-and-network',
	});

	return { repositories: data?.repositories, loading };
};

export default useRepositories;