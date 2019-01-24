import React from "react";
import checkLogin from "../../lib/checkLogin";
import { IGraphQLResponse, INextContextWithApollo } from "../../types/custom";
import IndexPresenter from "./indexPresenter";

interface IInitialProps {
  loggedInUser: IGraphQLResponse;
}

class Index extends React.Component {
  static async getInitialProps(context: INextContextWithApollo): Promise<IInitialProps> {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    return { loggedInUser };
  }

  render() {
    return <IndexPresenter loggedInUser={this.props.loggedInUser} />;
  }
}

export default Index;
