import React from "react";
import ProfilePresenter from "./profilePresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";

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
    return <ProfilePresenter loggedInUser={this.props.loggedInUser} />;
  }
}

export default ProfileContainer;
