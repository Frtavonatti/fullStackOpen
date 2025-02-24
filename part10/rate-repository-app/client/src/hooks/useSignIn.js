import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../context/authStorageContext';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  
  const signIn = async ({ username, password }) => {
    const mutation = await mutate({ 
      variables: { 
        username, 
        password 
      } 
    });
    const accessToken = mutation.data?.authorize?.accessToken;
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();
    return mutation;
  };

  return [signIn, result];
};

export default useSignIn;