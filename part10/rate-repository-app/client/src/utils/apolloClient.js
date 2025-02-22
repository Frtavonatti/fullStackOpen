import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const APOLLO_URI = process.env.EXPO_PUBLIC_APOLLO_URI;

const httpLink = createHttpLink({
  uri: APOLLO_URI,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;