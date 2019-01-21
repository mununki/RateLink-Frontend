import Global = NodeJS.Global;
import fetch from "isomorphic-unfetch";
import { NextContext } from "next";

export interface GlobalFetch extends Global {
  fetch: fetch;
}

export interface INextContextWithApollo extends NextContext {
  apolloClient: any;
}

export interface IGraphQLResponse {
  ok: boolean;
  data: IUser;
  error: string;
}

export interface IUser {
  id: number;
  email: string;
  nickname: string;
  profile: IProfile;
}

export interface IProfile {
  profile_name: string;
  company: string;
  job_boolean: number;
  image: string;
}
