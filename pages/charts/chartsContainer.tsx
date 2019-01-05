import React from "react";
import ChartsPresenter from "./chartsPresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";

class ChartsContainer extends React.Component {
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
        <ChartsPresenter loggedInUser={this.props.loggedInUser} />
      </Layout>
    );
  }
}

export default ChartsContainer;
