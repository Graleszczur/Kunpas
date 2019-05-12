import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from "react-apollo";
import 'materialize-css/dist/css/materialize.min.css'
import ApolloClient from "apollo-boost";


export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  headers: {
    authorization: `jwt ${localStorage.getItem('token')}`,
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
document.getElementById('root'));
