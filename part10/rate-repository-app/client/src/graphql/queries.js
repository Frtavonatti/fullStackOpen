import { gql } from "@apollo/client";
import { RepositoryDetails } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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

export const GET_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;