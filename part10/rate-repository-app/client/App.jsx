import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import client from './src/utils/apolloClient';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </ApolloProvider>
  )
};

export default App;
