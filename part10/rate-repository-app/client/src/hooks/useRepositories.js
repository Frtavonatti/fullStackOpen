import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ first }, searchKeyword, orderBy, orderDirection) => {
	const variables = {
		first,
		searchKeyword,
		orderBy,
		orderDirection,
	};

	const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
		variables,
		fetchPolicy: 'cache-and-network',
	});

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data && data.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			query: GET_REPOSITORIES,
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
			// TODO: Study updateQuery
			updateQuery: (previousResult, { fetchMoreResult }) => {
				const nextResult = {
					repositories: {
						...fetchMoreResult.repositories,
						edges: [
							...previousResult.repositories.edges,
							...fetchMoreResult.repositories.edges,
						],
					},
				};

				return nextResult;
			},
		});
	};

	return { 
		repositories: data?.repositories,
		fetchMore: handleFetchMore, 
		loading 
	};
};

export default useRepositories;