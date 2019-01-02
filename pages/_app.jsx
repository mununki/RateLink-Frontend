import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
// import NProgress from "next-nprogress/component";
import withNProgress from "next-nprogress";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          {/* <NProgress /> */}
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withNProgress(300)(withApollo(MyApp));
