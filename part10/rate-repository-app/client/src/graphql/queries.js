import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          url
          ownerAvatarUrl
          description
          language
          forksCount
        }
      }
    }
  }
`;