import { gql } from "@apollo/client";
import { RepositoryDetails } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection, 
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          ...RepositoryDetails
        }
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
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
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
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;