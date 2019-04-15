import React from "react";
import checkLogin from "../../lib/checkLogin";
import { INextContextWithApollo } from "../../types/custom";
import { UserResponse } from "../../types/graph";
import IndexPresenter from "./indexPresenter";

interface IInitialProps {
  loggedInUser: UserResponse;
}

class Index extends React.Component<IInitialProps> {
  static async getInitialProps(context: INextContextWithApollo): Promise<IInitialProps> {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    return { loggedInUser };
  }

  render() {
    return <IndexPresenter loggedInUser={this.props.loggedInUser} />;
  }
}

export default Index;
