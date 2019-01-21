import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withNProgress from "next-nprogress";
import withApollo from "../lib/withApollo";
import "moment/locale/ko";
import "../static/css/bootstrap.min.css";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
        <style jsx global>
          {`
            body {
              margin: 0px;
              padding: 0px;
              background-color: #efefef;
              font-size: 0.9em;
            }
            h1,
            h2,
            h3,
            h4,
            h5 {
              font-family: "Montserrat", sans-serif;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default withNProgress(300)(withApollo(MyApp));
