import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Application } from './components/Application/Application';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-common';
import './index.scss';
// import rootReducer from './reducer/roote.reducer';

// const state = window.__REDUX_STATE__;
// delete window.__REDUX_STATE__;

// const store = createStore(rootReducer, state);

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: createHttpLink({uri: 'http://localhost:8080/graphql'}),
});

ReactDOM.hydrate(
  // tslint:disable-next-line
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Application/>
    </BrowserRouter>
  </ApolloProvider>
  ,
  document.getElementById('root')
);
