import React, { Component, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AsyncSelect from "react-select/lib/Async";
import { Query, Mutation, withApollo } from "react-apollo";
import Popover from "react-simple-popover";
import Modal from "react-responsive-modal";
import { SET_MODE, SET_QUERYPARAMS, GET_QUERYPARAMS } from "../../lib/client";
import {
  GET_INPUTPERSONS,
  GET_CLIENTS,
  GET_LINERS,
  GET_LOCATIONS,
  GET_CNTRTYPES,
  SET_RATE,
  GET_RATES
} from "../../pages/rates/ratesQueries";
import handleMomentToString from "../../utils/handleMomentToString";
import handleMomentToStringForSetRate from "../../utils/handleMomentToStringForSetRate";
import convertToModifyRate from "../../utils/convertToModifyRate";
import { notify } from "../../utils/notify";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 110;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 110;
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
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
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #eee;
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #eee;
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  cursor: pointer;
  color: #fff;
  background-color: #3498db;
  &:hover {
    background-color: #2980b9;
  }
`;

const DivModalContainer = styled.div`
  display: flex;
  width: 400px;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-around;
`;

const DivModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const DivModalConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  color: white;
  background-color: #6dbad8;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  cursor: pointer;
`;

const DivModalCancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  background-color: #ccc;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  cursor: pointer;
`;

class CustomInputDatePicker extends Component {
  render() {
    return (
      <div className="btn primary btn-sm" onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}

class RateAddCard extends Component {
  state = {
    isCommentOpen: false,
    inputModal: false,
    modifyModal: false,
    newRate: {
      selectedIp: [{ value: this.props.loggedInUser.data.id }],
      selectedCt: [],
      selectedLn: [],
      selectedPl: [],
      selectedPd: [],
      selectedTy: [],
      buying20: this.props.rate ? this.props.rate.buying20 : 0,
      buying40: this.props.rate ? this.props.rate.buying40 : 0,
      buying4H: this.props.rate ? this.props.rate.buying4H : 0,
      selling20: this.props.rate ? this.props.rate.selling20 : 0,
      selling40: this.props.rate ? this.props.rate.selling40 : 0,
      selling4H: this.props.rate ? this.props.rate.selling4H : 0,
      loadingFT: this.props.rate ? this.props.rate.loadingFT : 0,
      dischargingFT: this.props.rate ? this.props.rate.dischargingFT : 0,
      offeredDate: this.props.rate
        ? moment(this.props.rate.offeredDate)
        : moment(),
      effectiveDate: this.props.rate
        ? moment(this.props.rate.effectiveDate)
        : moment().endOf("month"),
      remark: this.props.rate ? this.props.rate.remark : ""
    }
  };

  componentDidMount() {
    if (this.props.rate) {
      const { rate } = this.props;

      this.setState({
        newRate: {
          ...this.state.newRate,
          selectedCt: { label: rate.client.name, value: rate.client.id },
          selectedLn: { label: rate.liner.label, value: rate.liner.id },
          selectedPl: { label: rate.pol.name, value: rate.pol.id },
          selectedPd: { label: rate.pod.name, value: rate.pod.id },
          selectedTy: { label: rate.cntrtype.name, value: rate.cntrtype.id }
        }
      });
    }
  }
  _toggleComment = () => {
    this.setState({
      isCommentOpen: !this.state.isCommentOpen
    });
  };
  _closeComment = () => {
    this.setState({
      isCommentOpen: false
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
          search: inputValue
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
          search: inputValue
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
      newRate: {
        ...this.state.newRate,
        [target]: data
      }
    });
  };
  _handleInput = event => {
    this.setState({
      newRate: {
        ...this.state.newRate,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    const { isModify } = this.props;
    const { newRate } = this.state;
    return (
      <DivContainer>
        <DivHeader>
          <DivHeaderInputperson>
            {this.props.loggedInUser.data.profile.profile_name}
          </DivHeaderInputperson>
          <DivHeaderAccount>
            <div
              style={{
                width: "100%",
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem"
              }}
            >
              <AsyncSelect
                name="account"
                isMulti={!isModify}
                cacheOptions
                defaultOptions
                loadOptions={this._loadClients}
                openOnFocus={true}
                placeholder="화주"
                onChange={data => this._handleChange(data, "selectedCt")}
                value={this.state.newRate.selectedCt}
                tabIndex="1"
                isClearable={false}
              />
            </div>
          </DivHeaderAccount>
          <DivHeaderLiner>
            <div
              style={{
                width: "100%",
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem"
              }}
            >
              <AsyncSelect
                name="liner"
                isMulti={!isModify}
                cacheOptions
                defaultOptions
                loadOptions={this._loadLiners}
                openOnFocus={true}
                placeholder="선사"
                onChange={data => this._handleChange(data, "selectedLn")}
                value={this.state.newRate.selectedLn}
                tabIndex="2"
                isClearable={false}
              />
            </div>
          </DivHeaderLiner>
          <DivHeaderPol>
            <div
              style={{
                width: "100%",
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem"
              }}
            >
              <AsyncSelect
                name="pol"
                isMulti={!isModify}
                loadOptions={this._loadPols}
                openOnFocus={true}
                placeholder="POL"
                onChange={data => this._handleChange(data, "selectedPl")}
                value={this.state.newRate.selectedPl}
                tabIndex="3"
                isClearable={false}
              />
            </div>
          </DivHeaderPol>
          <DivHeaderPod>
            <div
              style={{
                width: "100%",
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem"
              }}
            >
              <AsyncSelect
                name="pod"
                isMulti={!isModify}
                loadOptions={this._loadPods}
                openOnFocus={true}
                placeholder="POD"
                onChange={data => this._handleChange(data, "selectedPd")}
                value={this.state.newRate.selectedPd}
                tabIndex="4"
                isClearable={false}
              />
            </div>
          </DivHeaderPod>
          <DivHeaderType>
            <div
              style={{
                width: "100%",
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem"
              }}
            >
              <AsyncSelect
                name="type"
                isMulti={!isModify}
                cacheOptions
                defaultOptions
                loadOptions={this._loadTypes}
                openOnFocus={true}
                placeholder="TYPE"
                onChange={data => this._handleChange(data, "selectedTy")}
                value={this.state.newRate.selectedTy}
                tabIndex="5"
                isClearable={false}
              />
            </div>
          </DivHeaderType>
          <DivHeaderBS>
            <DivHeaderBSType>
              <DivHeaderBSType20>
                <input
                  type="number"
                  className="form-control"
                  name="buying20"
                  value={newRate.buying20}
                  onChange={this._handleInput}
                  tabIndex="6"
                />
              </DivHeaderBSType20>
              <DivHeaderBSType40>
                <input
                  type="number"
                  className="form-control"
                  name="buying40"
                  value={newRate.buying40}
                  onChange={this._handleInput}
                  tabIndex="7"
                />
              </DivHeaderBSType40>
              <DivHeaderBSType4H>
                <input
                  type="number"
                  className="form-control"
                  name="buying4H"
                  value={newRate.buying4H}
                  onChange={this._handleInput}
                  tabIndex="8"
                />
              </DivHeaderBSType4H>
            </DivHeaderBSType>
          </DivHeaderBS>
          <DivHeaderBS>
            <DivHeaderBSType>
              <DivHeaderBSType20>
                <input
                  type="number"
                  className="form-control"
                  name="selling20"
                  value={newRate.selling20}
                  onChange={this._handleInput}
                  tabIndex="9"
                />
              </DivHeaderBSType20>
              <DivHeaderBSType40>
                <input
                  type="number"
                  className="form-control"
                  name="selling40"
                  value={newRate.selling40}
                  onChange={this._handleInput}
                  tabIndex="10"
                />
              </DivHeaderBSType40>
              <DivHeaderBSType4H>
                <input
                  type="number"
                  className="form-control"
                  name="selling4H"
                  value={newRate.selling4H}
                  onChange={this._handleInput}
                  tabIndex="11"
                />
              </DivHeaderBSType4H>
            </DivHeaderBSType>
          </DivHeaderBS>
          <DivHeaderLF>
            <input
              type="number"
              className="form-control"
              name="loadingFT"
              value={newRate.loadingFT}
              onChange={this._handleInput}
              tabIndex="12"
            />
          </DivHeaderLF>
          <DivHeaderDF>
            <input
              type="number"
              className="form-control"
              name="dischargingFT"
              value={newRate.dischargingFT}
              onChange={this._handleInput}
              tabIndex="13"
            />
          </DivHeaderDF>
          <DivHeaderOD>
            <DatePicker
              customInput={<CustomInputDatePicker />}
              selected={newRate.offeredDate}
              onChange={value => this._handleChange(value, "offeredDate")}
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
              tabIndex={14}
            />
          </DivHeaderOD>
          <DivHeaderED>
            <DatePicker
              customInput={<CustomInputDatePicker />}
              selected={newRate.effectiveDate}
              onChange={value => this._handleChange(value, "effectiveDate")}
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
              tabIndex={15}
            />
          </DivHeaderED>
          <DivHeaderRMK>
            {newRate.remark ? (
              <i
                className="fas fa-comment"
                ref={node => (this._comment = node)}
                onClick={this._toggleComment}
                style={{
                  color: "#fdc02f",
                  fontSize: 20,
                  cursor: "pointer"
                }}
              />
            ) : (
              <i
                className="fas fa-comment"
                ref={node => (this._comment = node)}
                onClick={this._toggleComment}
                style={{
                  color: "lightgrey",
                  fontSize: 20,
                  cursor: "pointer"
                }}
              />
            )}
            <Popover
              placement="bottom"
              target={this._comment}
              show={this.state.isCommentOpen}
              onHide={this._closeComment}
              containerStyle={{
                zIndex: 150
              }}
            >
              <textarea
                className="form-control"
                name="remark"
                value={newRate.remark}
                onChange={this._handleInput}
                autoFocus
              />
            </Popover>
          </DivHeaderRMK>
          {isModify ? (
            <Mutation
              mutation={SET_RATE}
              variables={{
                newRate: JSON.stringify(
                  convertToModifyRate(this.state.newRate)
                ),
                handler: "modify",
                rateId: this.props.rate.id
              }}
              update={(cache, { data: { setRate } }) => {
                if (setRate) {
                  // onCompleted is not working because it will be unmounted after click modify button
                  notify("수정 성공!", "success");
                }
              }}
            >
              {setRate => (
                <Mutation
                  mutation={SET_MODE}
                  variables={{
                    mode: JSON.stringify({
                      isAdd: false,
                      isModify: false
                    })
                  }}
                >
                  {setMode => (
                    <Fragment>
                      <DivHeaderButtons
                        tabIndex="16"
                        onClick={() =>
                          this.setState({
                            modifyModal: true
                          })
                        }
                      >
                        수정
                      </DivHeaderButtons>
                      <Modal
                        open={this.state.modifyModal}
                        onClose={() =>
                          this.setState({
                            modifyModal: false
                          })
                        }
                        center
                      >
                        <DivModalContainer>
                          <div>수정하시겠습니까?</div>
                          <DivModalButtons>
                            <DivModalCancelButton
                              onClick={() =>
                                this.setState({
                                  modifyModal: false
                                })
                              }
                            >
                              취소
                            </DivModalCancelButton>
                            <DivModalConfirmButton
                              onClick={() => {
                                setRate();
                                setMode();
                              }}
                            >
                              수정
                            </DivModalConfirmButton>
                          </DivModalButtons>
                        </DivModalContainer>
                      </Modal>
                    </Fragment>
                  )}
                </Mutation>
              )}
            </Mutation>
          ) : (
            <Query query={GET_QUERYPARAMS}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error :(</div>;

                const queryParams = data.queryParams;
                return (
                  <Mutation
                    mutation={SET_RATE}
                    variables={{
                      newRate: JSON.stringify(
                        handleMomentToStringForSetRate(this.state.newRate)
                      ),
                      handler: "add"
                    }}
                    update={(cache, { data: { setRate } }) => {
                      const { getRates } = cache.readQuery({
                        query: GET_RATES,
                        variables: {
                          first: 20,
                          queryParams: JSON.stringify(
                            handleMomentToString(queryParams)
                          ),
                          after: null
                        }
                      });
                      cache.writeQuery({
                        query: GET_RATES,
                        variables: {
                          first: 20,
                          queryParams: JSON.stringify(
                            handleMomentToString(queryParams)
                          ),
                          after: null
                        },
                        data: {
                          getRates: {
                            ...getRates,
                            data: {
                              ...getRates.data,
                              edges: [
                                ...setRate.map(edge => {
                                  const newEdge = {
                                    cursor: edge.id,
                                    node: edge,
                                    __typename: "Rate_rateEdge"
                                  };
                                  return newEdge;
                                }),
                                ...getRates.data.edges
                              ]
                            }
                          }
                        }
                      });
                      notify("입력 성공!", "success");
                    }}
                  >
                    {setRate => (
                      <Mutation
                        mutation={SET_MODE}
                        variables={{
                          mode: JSON.stringify({
                            isAdd: false,
                            isModify: false
                          })
                        }}
                      >
                        {setMode => (
                          <Fragment>
                            <DivHeaderButtons
                              tabIndex="16"
                              onClick={() =>
                                this.setState({
                                  inputModal: true
                                })
                              }
                            >
                              입력
                            </DivHeaderButtons>
                            <Modal
                              open={this.state.inputModal}
                              onClose={() =>
                                this.setState({
                                  inputModal: false
                                })
                              }
                              center
                            >
                              <DivModalContainer>
                                <div>입력하시겠습니까?</div>
                                <DivModalButtons>
                                  <DivModalCancelButton
                                    onClick={() =>
                                      this.setState({
                                        inputModal: false
                                      })
                                    }
                                  >
                                    취소
                                  </DivModalCancelButton>
                                  <DivModalConfirmButton
                                    onClick={() => {
                                      setMode();
                                      setRate();
                                    }}
                                  >
                                    입력
                                  </DivModalConfirmButton>
                                </DivModalButtons>
                              </DivModalContainer>
                            </Modal>
                          </Fragment>
                        )}
                      </Mutation>
                    )}
                  </Mutation>
                );
              }}
            </Query>
          )}
        </DivHeader>
      </DivContainer>
    );
  }
}

export default withApollo(RateAddCard);
