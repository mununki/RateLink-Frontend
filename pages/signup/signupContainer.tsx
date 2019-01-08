import React from "react";
import Signup from "./signupPresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";

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
    return (
      <Layout loggedInUser={this.props.loggedInUser}>
        <Signup />
      </Layout>
    );
  }
}

export default SignupContainer;
