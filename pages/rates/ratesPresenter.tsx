import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
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
        <Query
          query={gql(`query{
					getMyClients(skip:0, first:1){
					ok
					error
					count
					}
				}`)}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (error) {
              return <div>Error :(</div>;
            }
            if (data.getMyClients.ok && data.getMyClients.count === 0) {
              return (
                <div className="alert alert-danger" role="alert">
                  You didn't save any client to manage your freight rate. Please go to{" "}
                  <a href="/clients">the client management page</a> and save a client.
                </div>
              );
            } else {
              return null;
            }
          }}
        </Query>
        <RatesHeader ratesHeader={this.ratesHeader} />
        <RatesMain loggedInUser={this.props.loggedInUser} ratesMain={this.ratesMain} />
      </div>
    );
  }
}

export default RatesPresenter;
