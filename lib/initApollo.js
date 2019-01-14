import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { withClientState } from "apollo-link-state";
import "cross-fetch/polyfill";
import { defaults, resolvers } from "./client";

export const __APOLLO_CLIENT__ = "__APOLLO_CLIENT__";

// Polyfill fetch() on the server (used by apollo-client)
// if (!process.browser) {
//   global.fetch = fetch;
// }

const create = (initialState, { getToken }) => {
  const httpLink = createUploadLink({
    uri: process.env.GRAPHQL_URL,
    credentials: "same-origin"
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : ""
      }
    };
  });

  const cache = new InMemoryCache().restore(initialState || {});

  const stateLink = withClientState({
    defaults,
    resolvers
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    link: ApolloLink.from([authLink, stateLink, httpLink]),
    cache,
    connectToDevTools: process.browser,
    ssrMode: !process.browser // Disables forceFetch on the server (so queries are only run once)
  });
};

const initApollo = (initialState, options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!window[__APOLLO_CLIENT__]) {
    window[__APOLLO_CLIENT__] = create(initialState, options);
  }

  return window[__APOLLO_CLIENT__];
};

export default initApollo;
