import React from "react";
import { withApollo } from "react-apollo";
import RatesHeader from "../../components/rates/RatesHeader";
import RatesMain from "../../components/rates/RatesMain";

class RatesPresenter extends React.Component {
  render() {
    return (
      <div className="padding-global-top">
        <RatesHeader />
        <RatesMain />
      </div>
    );
  }
}

export default withApollo(RatesPresenter);
