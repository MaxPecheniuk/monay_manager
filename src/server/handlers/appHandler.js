import React from 'react';
import { renderToString } from 'react-dom/server';
import { template } from '../template';
import { StaticRouter } from 'react-router';
import { Application } from '../../universal/components/Application/Application';
import { ChunkExtractor } from '@loadable/server';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getDataFromTree } from "@apollo/react-ssr"
import { ApolloProvider } from '@apollo/react-common';
// import { SchemaLink } from 'apollo-link-schema';
const paths = require('../../../tools/webpack/paths');
const path = require('path');
// import { typeDefs } from '../graphql/schema';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
const client = new ApolloClient({
  ssrMode: true,
  // link: new SchemaLink(typeDefs),
  link: createHttpLink({
    uri: 'http://localhost:8080/graphql',
    fetch}),

  cache: new InMemoryCache(),
});

export const appHandler = (req) => {
  const extractor = new ChunkExtractor({
    statsFile: path.resolve(paths.loadableStats),
  });

  const context = {};
  const {pathname, search} = req.url;
  const html = (
    <ApolloProvider client={client}>
      <StaticRouter location={pathname + search} context={context}>
        <Application/>
      </StaticRouter>
    </ApolloProvider>

  );

  return getDataFromTree(html)
    .then(() => {
      let apolloState = client.extract();
      const content = renderToString(extractor.collectChunks(html));
      const scriptTags = extractor.getScriptTags();
      const styleTags = extractor.getStyleTags();
      return template(content, scriptTags, styleTags, apolloState);
    });
};
