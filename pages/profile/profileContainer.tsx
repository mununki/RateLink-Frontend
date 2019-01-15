import React from "react";
import ProfilePresenter from "./profilePresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";

class ProfileContainer extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
      redirect(context, "/login");
    }

    return { loggedInUser };
  }
  state = {
    profile_name: this.props.loggedInUser.data.profile.profile_name,
    company: this.props.loggedInUser.data.profile.company,
    job_boolean:
      this.props.loggedInUser.data.profile.job_boolean === ""
        ? "0"
        : this.props.loggedInUser.data.profile.job_boolean,
    image: this.props.loggedInUser.data.profile.image
  };
  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Layout loggedInUser={this.props.loggedInUser}>
        <ProfilePresenter
          profile={this.state}
          _handleChange={this._handleChange}
        />
      </Layout>
    );
  }
}

export default ProfileContainer;
