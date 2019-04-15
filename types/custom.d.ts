import Global = NodeJS.Global;
import fetch from "isomorphic-unfetch";
import { NextContext } from "next";
import { UserResponse } from "./types/graph";

export interface GlobalFetch extends Global {
  fetch: fetch;
}

export interface INextContextWithApollo extends NextContext {
  apolloClient: any;
}

export interface IInitialProps {
  loggedInUser: UserResponse;
}
