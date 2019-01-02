import React from "react";
import ProfilePresenter from "./profilePresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";

class ProfileContainer extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
      // If not signed in, send them somewhere more useful
      console.log("not logged in");
      redirect(context, "/login");
    }

    return { loggedInUser };
  }
  render() {
    return (
      <Layout loggedInUser={this.props.loggedInUser}>
        <ProfilePresenter loggedInUser={this.props.loggedInUser} />
      </Layout>
    );
  }
}

export default ProfileContainer;
