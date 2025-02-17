import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')
  const authHeaders = {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {})
    }
  }
  return authHeaders
})


const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />  
    </React.StrictMode>
  </ApolloProvider>
);
