import React from "react";
import RatesHeader from "../../components/rates/RatesHeader";
import RatesMain from "../../components/rates/RatesMain";

class RatesPresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerFixed: false
    };
    this.ratesHeader = React.createRef();
    this.ratesMain = React.createRef();
  }
  _controlHeader = () => {
    if (window.scrollY > 90) {
      this.ratesHeader.current.classList.add("fixed");
      this.ratesHeader.current.classList.remove("not-fixed");
      this.ratesMain.current.classList.add("padding-under-fixed-header");
    } else {
      this.ratesHeader.current.classList.remove("fixed");
      this.ratesHeader.current.classList.add("not-fixed");
      this.ratesMain.current.classList.remove("padding-under-fixed-header");
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
        <RatesHeader ratesHeader={this.ratesHeader} />
        <RatesMain
          loggedInUser={this.props.loggedInUser}
          ratesMain={this.ratesMain}
        />
      </div>
    );
  }
}

export default RatesPresenter;
