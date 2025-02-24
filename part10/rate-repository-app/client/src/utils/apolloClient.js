import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const APOLLO_URI = process.env.EXPO_PUBLIC_APOLLO_URI;

const httpLink = createHttpLink({
  uri: APOLLO_URI,
});

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
};

export default createApolloClient;