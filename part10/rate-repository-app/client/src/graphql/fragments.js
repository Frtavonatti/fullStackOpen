import { gql } from '@apollo/client';

export const RepositoryDetails = gql`
  fragment RepositoryDetails on Repository {
    ownerName
    id
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
`;