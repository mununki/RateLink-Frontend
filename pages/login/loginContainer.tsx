import React from "react";
import Layout from "../../components/Layout";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import { IGraphQLResponse, INextContextWithApollo } from "../../types/custom";
import LoginPresenter from "./loginPresenter";

interface IInitialProps {
  loggedInUser: IGraphQLResponse;
}

class LoginContainer extends React.Component {
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
