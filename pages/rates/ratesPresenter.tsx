import React from "react";
import RatesHeader from "../../components/rates/RatesHeader";
import RatesMain from "../../components/rates/RatesMain";

class RatesPresenter extends React.Component {
  state = {
    headerFixed: false
  };
  _controlHeader = () => {
    const ratesHeader = document.querySelector("#rates-header");
    const ratesMain = document.querySelector("#rates-main");
    if (window.scrollY > 90) {
      ratesHeader.classList.add("fixed");
      ratesHeader.classList.remove("not-fixed");
      ratesMain.classList.add("padding-under-fixed-header");
    } else {
      ratesHeader.classList.remove("fixed");
      ratesHeader.classList.add("not-fixed");
      ratesMain.classList.remove("padding-under-fixed-header");
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this._controlHeader);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this._controlHeader);
  }
  render() {
    return (
      <div className="padding-global-top">
        <RatesHeader />
        <RatesMain loggedInUser={this.props.loggedInUser} />
      </div>
    );
  }
}

export default RatesPresenter;
