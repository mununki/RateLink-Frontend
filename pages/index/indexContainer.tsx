import React from "react";
import checkLogin from "../../lib/checkLogin";
import IndexPresenter from "./indexPresenter";

class Index extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
    }

    return { loggedInUser };
  }

  render() {
    return <IndexPresenter />;
  }
}

export default Index;
