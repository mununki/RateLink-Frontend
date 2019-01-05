import React from "react";
import LoginPresenter from "./loginPresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";

class LoginContainer extends React.Component {
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
        <LoginPresenter />
      </Layout>
    );
  }
}

export default LoginContainer;
