import { RepositoryListContainer } from "../components/RepositoryList";
import { render, within } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      
      const repositoryItems = getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);
      
      const [ firstRepository, secondRepository ] = repositoryItems;

      // Full name
      expect(within(firstRepository).getByTestId('fullName')).toHaveTextContent('jaredpalmer/formik');
      expect(within(secondRepository).getByTestId('fullName')).toHaveTextContent('async-library/react-async');
      
      // Description
      expect(within(firstRepository).getByTestId('description')).toHaveTextContent('Build forms in React, without the tears');
      expect(within(secondRepository).getByTestId('description')).toHaveTextContent('Flexible promise-based React data loader');

      // Language
      expect(within(firstRepository).getByTestId('language')).toHaveTextContent('TypeScript');
      expect(within(secondRepository).getByTestId('language')).toHaveTextContent('JavaScript');

      // Stars
      expect(within(firstRepository).getByTestId('stars')).toHaveTextContent('21.9 k');
      expect(within(secondRepository).getByTestId('stars')).toHaveTextContent('1.8 k');

      // Forks
      expect(within(firstRepository).getByTestId('forks')).toHaveTextContent('1.6 k');
      expect(within(secondRepository).getByTestId('forks')).toHaveTextContent('69');

      // Reviews
      expect(within(firstRepository).getByTestId('reviews')).toHaveTextContent('3');
      expect(within(secondRepository).getByTestId('reviews')).toHaveTextContent('3');

      // Rating
      expect(within(firstRepository).getByTestId('rating')).toHaveTextContent('88');
      expect(within(secondRepository).getByTestId('rating')).toHaveTextContent('72');

      // Avatar
      expect(within(firstRepository).getByTestId('avatar')).toHaveProp('source', { uri: 'https://avatars2.githubusercontent.com/u/4060187?v=4' });
      expect(within(secondRepository).getByTestId('avatar')).toHaveProp('source', { uri: 'https://avatars1.githubusercontent.com/u/54310907?v=4' });
    });
  });
});