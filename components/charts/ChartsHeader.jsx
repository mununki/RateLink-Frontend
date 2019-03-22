import React from "react";
import { GET_LOCATIONS, GET_CNTRTYPES } from "../../pages/rates/ratesQueries";
import { SET_CHARTQUERYPARAMS } from "../../lib/client";
import AsyncSelect from "react-select/lib/Async";
import { Query, Mutation, withApollo } from "react-apollo";
import moment from "moment";
import handleMomentToString from "../../utils/handleMomentToString";

class ChartHeader extends React.Component {
  state = {
    duration: [],
    chartQueryParams: {
      selectedPl: "",
      selectedPd: "",
      selectedTy: "",
      initialSF: moment()
        .subtract(3, "months")
        .startOf("month"),
      initialST: moment().endOf("month")
    }
  };
  async componentDidMount() {
    const duration = await this._getDuration();
    this.setState({
      duration
    });
  }
  _getDuration = () => {
    return new Promise((resolve, reject) => {
      let result = [];

      let currentDate = moment()
        .subtract(24, "month")
        .startOf("month");
      let endDate = moment().endOf("month");

      while (currentDate.isBefore(endDate)) {
        result.push(currentDate.format("YYYY-MM"));
        currentDate.add(1, "month");
      }
      resolve(result);
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
            response.data.getLocations.map(lo => results.push({ label: lo.name, value: lo.id }));
            resolve(results);
          });
      }, 500);
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
        response.data.getCNTRtypes.map(ty => results.push({ label: ty.name, value: ty.id }));
        return results;
      });
  };
  _handleChange = (data, target) => {
    this.setState({
      chartQueryParams: {
        ...this.state.chartQueryParams,
        [target]: data
      }
    });
  };
  render() {
    const { chartQueryParams } = this.state;
    return (
      <div className="container-fluid">
        <div className="row m-0 px-2">
          <div className="col-12 col-sm-4 col-lg-3 px-0">
            <AsyncSelect
              name="headerPol"
              cacheOptions
              loadOptions={this._loadPols}
              openOnFocus={true}
              placeholder="POL"
              onChange={data => this._handleChange(data, "selectedPl")}
              value={chartQueryParams.selectedPl}
              isClearable={false}
            />
          </div>
          <div className="col-12 col-sm-4 col-lg-3 px-0">
            <AsyncSelect
              name="headerPod"
              cacheOptions
              loadOptions={this._loadPods}
              openOnFocus={true}
              placeholder="POD"
              onChange={data => this._handleChange(data, "selectedPd")}
              value={chartQueryParams.selectedPd}
              isClearable={false}
            />
          </div>
          <div className="col-12 col-sm-4 col-lg-3 px-0">
            <AsyncSelect
              name="headerType"
              cacheOptions
              defaultOptions
              loadOptions={this._loadTypes}
              openOnFocus={true}
              placeholder="TYPE"
              onChange={data => this._handleChange(data, "selectedTy")}
              value={chartQueryParams.selectedTy}
              isClearable={false}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-3 px-0">
            <div className="row m-0 px-0">
              <div className="col px-0">
                <select
                  name="initialSF"
                  className="form-control"
                  value={this.state.chartQueryParams.initialSF.format("YYYY-MM")}
                  onChange={event => this._handleChange(moment(event.target.value), "initialSF")}
                >
                  {this.state.duration.map((mon, k) => (
                    <option key={k} value={mon}>
                      {mon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col px-0">
                <select
                  name="initialST"
                  className="form-control"
                  value={this.state.chartQueryParams.initialST.format("YYYY-MM")}
                  onChange={event => this._handleChange(moment(event.target.value).endOf("month"), "initialST")}
                >
                  {this.state.duration.map((mon, k) => (
                    <option key={k} value={mon}>
                      {mon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-3 p-0">
                <Mutation
                  mutation={SET_CHARTQUERYPARAMS}
                  variables={{
                    chartQueryParams: this.state.chartQueryParams
                  }}
                >
                  {setChartQueryParams => (
                    <button className="btn btn-primary float-right" onClick={() => setChartQueryParams()}>
                      Search
                    </button>
                  )}
                </Mutation>
              </div>
            </div>
          </div>
          <div className="my-1">
            <mark>(Note: Average Rate per liner)</mark>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(ChartHeader);
