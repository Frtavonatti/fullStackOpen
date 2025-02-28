import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const useReviews = ({ first, id }) => {
  const variables = {
    id,
    first,
  };

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
  
    if (!canFetchMore) {
      return;
    }
  
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.repository?.reviews) {
          return previousResult;
        }
  
        return {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
      },
    });
  };

  return { 
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore, 
    loading 
  };
}

export default useReviews;