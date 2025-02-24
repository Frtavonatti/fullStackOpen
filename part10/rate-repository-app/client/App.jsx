import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/authStorageContext';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {  
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <AuthStorageContext.Provider value={authStorage} >
          <Main />
        </AuthStorageContext.Provider>
      </NativeRouter>
    </ApolloProvider>
  )
};

export default App;
