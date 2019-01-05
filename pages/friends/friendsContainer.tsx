import React from "react";
import FriendsPresenter from "./friendsPresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";

class FriendsContainer extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
      redirect(context, "/login");
    }

    return { loggedInUser };
  }
  render() {
    return (
      <Layout loggedInUser={this.props.loggedInUser}>
        <FriendsPresenter loggedInUser={this.props.loggedInUser} />
      </Layout>
    );
  }
}

export default FriendsContainer;
