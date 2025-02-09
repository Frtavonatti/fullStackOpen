import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GET_AUTHORS } from "./querys.js";
import './index.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

client.query({ query: GET_AUTHORS })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />  
    </React.StrictMode>
  </ApolloProvider>
);
