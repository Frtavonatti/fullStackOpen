import { gql } from "@apollo/client";
import { RepositoryDetails } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int,
    $after: String,
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection, 
    $searchKeyword: String
  ) {
    repositories(
      first: $first,
      after: $after,
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${RepositoryDetails}
`;

export const GET_REPOSITORY_DETAILS = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
    }
  }
  ${RepositoryDetails}
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            repository {
              id
              fullName
            }
          }  
        }
      }
    }
  }
`;