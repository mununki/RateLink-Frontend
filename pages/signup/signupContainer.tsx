import React from "react";
import SignupPresenter from "./signupPresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";

class SignupContainer extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
    } else {
      redirect(context, "/");
    }

    return { loggedInUser };
  }
  render() {
    return <SignupPresenter />;
  }
}

export default SignupContainer;
