import React from "react";
import { withApollo } from "react-apollo";

class RatesPresenter extends React.Component {
  render() {
    return (
      <div className="padding-global-top">
        <i className="fas fa-user-circle" />
        {this.props.loggedInUser.data.nickname}
      </div>
    );
  }
}

export default withApollo(RatesPresenter);
