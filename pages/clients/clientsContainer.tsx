import React from "react";
import Layout from "../../components/Layout";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import { IInitialProps, INextContextWithApollo } from "../../types/custom";
import ClientsPresenter from "./clientsPresenter";

class RatesContainer extends React.Component<IInitialProps> {
  static async getInitialProps(context: INextContextWithApollo) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
      redirect(context, "/login");
    }

    return { loggedInUser };
  }
  render() {
    return (
      <Layout loggedInUser={this.props.loggedInUser}>
        <ClientsPresenter loggedInUser={this.props.loggedInUser} />
      </Layout>
    );
  }
}

export default RatesContainer;
