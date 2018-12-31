import Global = NodeJS.Global;
import fetch from "isomorphic-unfetch";

export interface GlobalFetch extends Global {
  fetch: fetch;
}
