import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
const client = new ApolloClient({
  uri: 'http://localhost:57326/',
  cache: new InMemoryCache()
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
// debugger
//   client.query({
//     query: gql`
//     query allPeople(first:10){
//       people {
//         id,
//         name,
//         birthYear,
//         gender,
//       species { name },
//          homeworld { name }
//       }
//       }
//     `
//   }) .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
    <App />
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
