import React from "react";
import styled from "styled-components";
import AsyncSelect from "react-select/lib/Async";
// import "react-select/dist/react-select.css";
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

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 200;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${props => props.theme};
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 1rem;
  padding-right: 0.3rem;
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  max-width: 120px;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 1rem;
`;

const DivHeaderBS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  min-width: 200px;
  border-left: 1px solid #eee;
  background-color: ${props => props.theme};
  color: white;
`;

const DivHeaderBSTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  color: white;
  background-color: ${props => props.theme};
`;

class CustomInputDatePickerSF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-datepicker">
        <button
          id="headersf"
          className="btn-datepicker"
          onClick={this.props.onClick}
          tabIndex="-1"
        >
          {this.props.value}
        </button>
        견적일
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
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-datepicker">
        <button
          id="headerst"
          className="btn-datepicker"
          onClick={this.props.onClick}
          tabIndex="-1"
        >
          {this.props.value}
        </button>
        유효일
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
    return this.props.client
      .query({
        query: GET_INPUTPERSONS,
        variables: {
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.getInputpersons.map(ip =>
          results.push({ label: ip.profile.profile_name, value: ip.id })
        );
        results.sort((a, b) => (a.label > b.label ? 1 : -1));
        return results;
      });
  };
  _loadClients = inputValue => {
    return this.props.client
      .query({
        query: GET_CLIENTS,
        variables: {
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.getClients.map(ct =>
          results.push({ label: ct.name, value: ct.id })
        );
        return results;
      });
  };
  _loadLiners = inputValue => {
    return this.props.client
      .query({
        query: GET_LINERS,
        variables: {
          search: inputValue,
          showOurs: true
        }
      })
      .then(response => {
        let results = [];
        response.data.getLiners.map(ln =>
          results.push({ label: ln.label, value: ln.id })
        );
        return results;
      });
  };
  _loadPols = inputValue => {
    return this.props.client
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
        response.data.getLocations.map(lo =>
          results.push({ label: lo.name, value: lo.id })
        );
        return results;
      });
  };
  _loadPods = inputValue => {
    return this.props.client
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
        response.data.getLocations.map(lo =>
          results.push({ label: lo.name, value: lo.id })
        );
        return results;
      });
  };
  _loadTypes = inputValue => {
    return this.props.client
      .query({
        query: GET_CNTRTYPES,
        variables: {
          search: inputValue,
          showOurs: true
        }
      })
      .then(response => {
        let results = [];
        response.data.getCNTRtypes.map(ty =>
          results.push({ label: ty.name, value: ty.id })
        );
        return results;
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
              <DivContainer>
                <DivHeader theme={theme.DARK}>
                  <DivHeaderInputperson theme={theme}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem"
                      }}
                    >
                      <AsyncSelect
                        name="headerInputperson"
                        isDisabled={isAdd || isModify}
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={this._loadInputpersons}
                        openOnFocus={true}
                        placeholder="입력자"
                        onChange={data =>
                          this._handleChange(data, "selectedIp")
                        }
                        value={queryParams.selectedIp}
                        isClearable={false}
                      />
                    </div>
                  </DivHeaderInputperson>
                  <DivHeaderAccount theme={theme}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem"
                      }}
                    >
                      <AsyncSelect
                        name="headerClient"
                        isDisabled={isAdd || isModify}
                        isMulti
                        cacheOptions
                        loadOptions={this._loadClients}
                        openOnFocus={true}
                        placeholder="화주"
                        onChange={data =>
                          this._handleChange(data, "selectedCt")
                        }
                        value={queryParams.selectedCt}
                        isClearable={false}
                      />
                    </div>
                  </DivHeaderAccount>
                  <DivHeaderLiner theme={theme}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem"
                      }}
                    >
                      <AsyncSelect
                        name="headerLiner"
                        isDisabled={isAdd || isModify}
                        isMulti
                        cacheOptions
                        loadOptions={this._loadLiners}
                        openOnFocus={true}
                        placeholder="선사"
                        onChange={data =>
                          this._handleChange(data, "selectedLn")
                        }
                        value={queryParams.selectedLn}
                        isClearable={false}
                      />
                    </div>
                  </DivHeaderLiner>
                  <DivHeaderPol theme={theme}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem"
                      }}
                    >
                      <AsyncSelect
                        name="headerPol"
                        isDisabled={isAdd || isModify}
                        isMulti
                        cacheOptions
                        loadOptions={this._loadPols}
                        openOnFocus={true}
                        placeholder="POL"
                        onChange={data =>
                          this._handleChange(data, "selectedPl")
                        }
                        value={queryParams.selectedPl}
                        isClearable={false}
                      />
                    </div>
                  </DivHeaderPol>
                  <DivHeaderPod theme={theme}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem"
                      }}
                    >
                      <AsyncSelect
                        name="headerPod"
                        isDisabled={isAdd || isModify}
                        isMulti
                        cacheOptions
                        loadOptions={this._loadPods}
                        openOnFocus={true}
                        placeholder="POD"
                        onChange={data =>
                          this._handleChange(data, "selectedPd")
                        }
                        value={queryParams.selectedPd}
                        isClearable={false}
                      />
                    </div>
                  </DivHeaderPod>
                  <DivHeaderType theme={theme}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem"
                      }}
                    >
                      <AsyncSelect
                        name="headerType"
                        isDisabled={isAdd || isModify}
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={this._loadTypes}
                        openOnFocus={true}
                        placeholder="TYPE"
                        onChange={data =>
                          this._handleChange(data, "selectedTy")
                        }
                        value={queryParams.selectedTy}
                        isClearable={false}
                      />
                    </div>
                  </DivHeaderType>
                  <DivHeaderBS>
                    <DivHeaderBSTitle theme={theme.DARK}>BUY</DivHeaderBSTitle>
                    <DivHeaderBSType>
                      <DivHeaderBSType20 theme={theme.DARK}>
                        20'
                      </DivHeaderBSType20>
                      <DivHeaderBSType40 theme={theme.DARK}>
                        40'
                      </DivHeaderBSType40>
                      <DivHeaderBSType4H theme={theme.DARK}>
                        40'HC
                      </DivHeaderBSType4H>
                    </DivHeaderBSType>
                  </DivHeaderBS>
                  <DivHeaderBS>
                    <DivHeaderBSTitle theme={theme.DARK}>SELL</DivHeaderBSTitle>
                    <DivHeaderBSType>
                      <DivHeaderBSType20 theme={theme.DARK}>
                        20'
                      </DivHeaderBSType20>
                      <DivHeaderBSType40 theme={theme.DARK}>
                        40'
                      </DivHeaderBSType40>
                      <DivHeaderBSType4H theme={theme.DARK}>
                        40'HC
                      </DivHeaderBSType4H>
                    </DivHeaderBSType>
                  </DivHeaderBS>
                  <DivHeaderLF theme={theme.DARK}>L.F/T</DivHeaderLF>
                  <DivHeaderDF theme={theme.DARK}>D.F/T</DivHeaderDF>
                  <DivHeaderOD theme={theme.DARK}>
                    <DatePicker
                      customInput={<CustomInputDatePickerSF />}
                      selected={queryParams.initialSF}
                      onChange={value => this._handleChange(value, "initialSF")}
                      locale="ko"
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
                  </DivHeaderOD>
                  <DivHeaderED theme={theme.DARK}>
                    <DatePicker
                      customInput={<CustomInputDatePickerST />}
                      selected={queryParams.initialST}
                      onChange={value => this._handleChange(value, "initialST")}
                      locale="ko"
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
                  </DivHeaderED>
                  <DivHeaderRMK theme={theme.DARK}>
                    <i className="fas fa-comment" />
                  </DivHeaderRMK>
                  <DivHeaderButtons theme={theme.DARK}>
                    <i className="fas fa-plus" />
                  </DivHeaderButtons>
                </DivHeader>
              </DivContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withApollo(RatesHeader);
