import React from "react";
import AsyncSelect from "react-select/lib/Async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Query, withApollo } from "react-apollo";
import { GET_MODE, SET_QUERYPARAMS } from "../../lib/client";
import {
  GET_INPUTPERSONS,
  GET_CLIENTS,
  GET_LINERS,
  GET_LOCATIONS,
  GET_CNTRTYPES
} from "../../pages/rates/ratesQueries";
import { theme } from "../../lib/theme";
import moment from "moment";
import handleMomentToString from "../../utils/handleMomentToString";
import "../../static/css/fixedheader.css";

class CustomInputDatePickerSF extends React.Component {
  render() {
    return (
      <div className="container-datepicker">
        <button id="headersf" className="btn-datepicker" onClick={this.props.onClick} tabIndex="-1">
          {this.props.value}
        </button>
        From
        <style jsx>
          {`
            .container-datepicker {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .btn-datepicker {
              display: block;
              color: #eee;
              background-color: #053f5c;
              border: 0px;
            }
          `}
        </style>
      </div>
    );
  }
}

class CustomInputDatePickerST extends React.Component {
  render() {
    return (
      <div className="container-datepicker">
        <button id="headerst" className="btn-datepicker" onClick={this.props.onClick} tabIndex="-1">
          {this.props.value}
        </button>
        Till
        <style jsx>
          {`
            .container-datepicker {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .btn-datepicker {
              display: block;
              color: #eee;
              background-color: #053f5c;
              border: 0px;
            }
          `}
        </style>
      </div>
    );
  }
}

class RatesHeader extends React.Component {
  state = {
    queryParams: {
      selectedIp: [],
      selectedCt: [],
      selectedLn: [],
      selectedPl: [],
      selectedPd: [],
      selectedTy: [],
      initialSF: moment()
        .subtract(1, "months")
        .startOf("month"),
      initialST: moment()
        .add(1, "months")
        .endOf("month")
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.queryParams !== this.state.queryParams) {
      this.props.client.mutate({
        mutation: SET_QUERYPARAMS,
        variables: {
          queryParams: this.state.queryParams
        }
      });
    }
  }
  _loadInputpersons = inputValue => {
    if (!inputValue) {
      return this.props.client
        .query({
          query: GET_INPUTPERSONS,
          variables: {
            search: inputValue
          }
        })
        .then(response => {
          let results = [];
          response.data.getInputpersons.map(ip => results.push({ label: ip.profile.profile_name, value: ip.id }));
          results.sort((a, b) => (a.label > b.label ? 1 : -1));

          return results;
        });
    } else {
      clearTimeout(this.asyncInputControl);
      return new Promise((resolve, reject) => {
        this.asyncInputControl = setTimeout(() => {
          this.props.client
            .query({
              query: GET_INPUTPERSONS,
              variables: {
                search: inputValue
              }
            })
            .then(response => {
              let results = [];
              response.data.getInputpersons.map(ip => results.push({ label: ip.profile.profile_name, value: ip.id }));
              results.sort((a, b) => (a.label > b.label ? 1 : -1));

              resolve(results);
            });
        }, 500);
      });
    }
  };
  _loadClients = inputValue => {
    clearTimeout(this.asyncInputControl);
    return new Promise((resolve, reject) => {
      this.asyncInputControl = setTimeout(() => {
        this.props.client
          .query({
            query: GET_CLIENTS,
            variables: {
              search: inputValue
            }
          })
          .then(response => {
            let results = [];
            response.data.getClients.map(ct => results.push({ label: ct.name, value: ct.id }));
            resolve(results);
          });
      }, 500);
    });
  };
  _loadLiners = inputValue => {
    clearTimeout(this.asyncInputControl);
    return new Promise((resolve, reject) => {
      this.asyncInputControl = setTimeout(() => {
        this.props.client
          .query({
            query: GET_LINERS,
            variables: {
              search: inputValue,
              showOurs: true
            }
          })
          .then(response => {
            let results = [];
            response.data.getLiners.map(ln => results.push({ label: ln.label, value: ln.id }));
            resolve(results);
          });
      }, 500);
    });
  };
  _loadPols = inputValue => {
    clearTimeout(this.asyncInputControl);
    return new Promise((resolve, reject) => {
      this.asyncInputControl = setTimeout(() => {
        this.props.client
          .query({
            query: GET_LOCATIONS,
            variables: {
              search: inputValue,
              showOurs: true,
              polOrPod: "pol"
            }
          })
          .then(response => {
            let results = [];
            response.data.getLocations.map(lo => results.push({ label: lo.name, value: lo.id }));
            resolve(results);
          });
      }, 500);
    });
  };
  _loadPods = inputValue => {
    clearTimeout(this.asyncInputControl);
    return new Promise((resolve, reject) => {
      this.asyncInputControl = setTimeout(() => {
        this.props.client
          .query({
            query: GET_LOCATIONS,
            variables: {
              search: inputValue,
              showOurs: true,
              polOrPod: "pod"
            }
          })
          .then(response => {
            let results = [];
            response.data.getLocations.map(lo => results.push({ label: lo.name, value: lo.id }));
            resolve(results);
          });
      }, 500);
    });
  };
  _loadTypes = inputValue => {
    clearTimeout(this.asyncInputControl);
    return new Promise((resolve, reject) => {
      this.asyncInputControl = setTimeout(() => {
        this.props.client
          .query({
            query: GET_CNTRTYPES,
            variables: {
              search: inputValue,
              showOurs: true
            }
          })
          .then(response => {
            let results = [];
            response.data.getCNTRtypes.map(ty => results.push({ label: ty.name, value: ty.id }));
            resolve(results);
          });
      }, 500);
    });
  };
  _handleChange = (data, target) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [target]: data
      }
    });
  };
  render() {
    const { queryParams } = this.state;
    return (
      <React.Fragment>
        <Query query={GET_MODE}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;

            const isAdd = data.mode.isAdd;
            const isModify = data.mode.isModify;
            return (
              <div className="container-fluid">
                <div className="header shadow-lg d-flex flex-row not-fixed" ref={this.props.ratesHeader}>
                  <div className="header-inputperson">
                    <AsyncSelect
                      name="headerInputperson"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadInputpersons}
                      openOnFocus={true}
                      placeholder="OWNER"
                      onChange={data => this._handleChange(data, "selectedIp")}
                      value={queryParams.selectedIp}
                      isClearable={false}
                    />
                  </div>

                  <div className="header-account">
                    <AsyncSelect
                      name="headerClient"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      loadOptions={this._loadClients}
                      openOnFocus={true}
                      placeholder="ACCOUNT"
                      onChange={data => this._handleChange(data, "selectedCt")}
                      value={queryParams.selectedCt}
                      isClearable={false}
                    />
                  </div>

                  <div className="header-liner">
                    <AsyncSelect
                      name="headerLiner"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      loadOptions={this._loadLiners}
                      openOnFocus={true}
                      placeholder="LINER"
                      onChange={data => this._handleChange(data, "selectedLn")}
                      value={queryParams.selectedLn}
                      isClearable={false}
                    />
                  </div>

                  <div className="header-pol">
                    <AsyncSelect
                      name="headerPol"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      loadOptions={this._loadPols}
                      openOnFocus={true}
                      placeholder="POL"
                      onChange={data => this._handleChange(data, "selectedPl")}
                      value={queryParams.selectedPl}
                      isClearable={false}
                    />
                  </div>

                  <div className="header-pod">
                    <AsyncSelect
                      name="headerPod"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      loadOptions={this._loadPods}
                      openOnFocus={true}
                      placeholder="POD"
                      onChange={data => this._handleChange(data, "selectedPd")}
                      value={queryParams.selectedPd}
                      isClearable={false}
                    />
                  </div>

                  <div className="header-type">
                    <AsyncSelect
                      name="headerType"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadTypes}
                      openOnFocus={true}
                      placeholder="TYPE"
                      onChange={data => this._handleChange(data, "selectedTy")}
                      value={queryParams.selectedTy}
                      isClearable={false}
                    />
                  </div>

                  <div className="header-buying  d-flex flex-column align-items-stretch">
                    <div className="header-buying-title text-center">BUY</div>
                    <div className="header-buying-type d-flex flex-row justify-content-around">
                      <span>20'</span>
                      <span>40'</span>
                      <span>4H</span>
                    </div>
                  </div>
                  <div className="header-selling  d-flex flex-column align-items-stretch">
                    <div className="header-selling-title text-center">SELL</div>
                    <div className="header-selling-type d-flex flex-row justify-content-around">
                      <span>20'</span>
                      <span>40'</span>
                      <span>4H</span>
                    </div>
                  </div>
                  <div className="header-loadingFT d-flex justify-content-center align-items-center">L.F/T</div>
                  <div className="header-dischargingFT d-flex justify-content-center align-items-center">D.F/T</div>
                  <div className="header-datepicker d-flex justify-content-center align-items-center">
                    <DatePicker
                      customInput={<CustomInputDatePickerSF />}
                      selected={queryParams.initialSF}
                      onChange={value => this._handleChange(value, "initialSF")}
                      locale="en"
                      dateFormat="MM-DD"
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "-150px, 0px"
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "viewport"
                        }
                      }}
                    />
                  </div>
                  <div className="header-datepicker d-flex justify-content-center align-items-center">
                    <DatePicker
                      customInput={<CustomInputDatePickerST />}
                      selected={queryParams.initialST}
                      onChange={value => this._handleChange(value, "initialST")}
                      locale="en"
                      dateFormat="MM-DD"
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "-150px, 0px"
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "viewport"
                        }
                      }}
                    />
                  </div>
                  <div className="header-remark d-flex justify-content-center align-items-center">
                    <i className="fas fa-comment" />
                  </div>
                  <div className="header-button d-flex justify-content-center align-items-center">
                    <i className="fas fa-plus" />
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
        <style jsx>
          {`
            .header {
              background-color: ${theme.DARK};
              z-index: 210;
            }
            .header-inputperson {
              min-width: 120px;
              width: 100%;
              padding: 0.5rem 0.2rem 0.5rem 0.5rem;
              background-color: ${theme.DARK};
            }
            .header-account,
            .header-liner,
            .header-pol,
            .header-pod {
              min-width: 120px;
              width: 100%;
              padding: 0.5rem 0.2rem 0.5rem 0.2rem;
              background-color: ${theme.DARK};
            }
            .header-type {
              min-width: 120px;
              max-width: 120px;
              width: 100%;
              padding: 0.5rem 0.5rem 0.5rem 0.2rem;
              background-color: ${theme.DARK};
            }
            .header-buying,
            .header-selling {
              color: #fff;
              max-width: 200px;
              min-width: 200px;
              border-left: 1px solid #eee;
              background-color: ${theme.DARK};
            }
            .header-buying-title,
            .header-selling-title {
              color: #fff;
              margin: 0.2rem;
              background-color: ${theme.DARK};
            }
            .header-buying-type,
            .header-selling-type {
              color: #fff;
              margin: 0.2rem;
              background-color: ${theme.DARK};
            }
            .header-loadingFT {
              color: #fff;
              max-width: 70px;
              min-width: 70px;
              border-left: 1px solid #eee;
              background-color: ${theme.DARK};
            }
            .header-dischargingFT {
              color: #fff;
              max-width: 70px;
              min-width: 70px;
              background-color: ${theme.DARK};
            }
            .header-datepicker {
              color: #fff;
              max-width: 70px;
              min-width: 70px;
              background-color: ${theme.DARK};
            }
            .header-remark,
            .header-button {
              color: #fff;
              max-width: 40px;
              min-width: 40px;
              background-color: ${theme.DARK};
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default withApollo(RatesHeader);
