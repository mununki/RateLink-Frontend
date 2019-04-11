import React from "react";
import Layout from "../../components/Layout";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import { INextContextWithApollo } from "../../types/custom";
import { UserResponse } from "../../types/graph";
import LoginPresenter from "./loginPresenter";

interface IInitialProps {
  loggedInUser: UserResponse;
}

class LoginContainer extends React.Component<IInitialProps> {
  static async getInitialProps(context: INextContextWithApollo): Promise<IInitialProps> {
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
