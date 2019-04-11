import Global = NodeJS.Global;
import fetch from "isomorphic-unfetch";
import { NextContext } from "next";

export interface GlobalFetch extends Global {
  fetch: fetch;
}

export interface INextContextWithApollo extends NextContext {
  apolloClient: any;
}
