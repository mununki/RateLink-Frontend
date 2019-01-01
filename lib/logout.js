import redirect from "./redirect";
import cookie from "cookie";
import { __APOLLO_CLIENT__ } from "../lib/initApollo";

const logout = apolloClient => () => {
  document.cookie = cookie.serialize("token", "", {
    maxAge: -1 // Expire the cookie immediately
  });

  // Force a reload of all the current queries now that the user is
  // logged in, so we don't accidentally leave any state around.
  apolloClient.cache.reset().then(() => {
    // Redirect to a more useful page when signed out
    window[__APOLLO_CLIENT__] = null;
    redirect({}, "/");
  });
};

export default logout;
