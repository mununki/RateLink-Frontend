import React, { Component, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AsyncSelect from "react-select/lib/Async";
import { Query, Mutation } from "react-apollo";
import Popover from "react-simple-popover";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import {
  GET_ME,
  SET_MODE,
  GET_RATES,
  SET_RATE,
  GET_CLIENTS,
  GET_LINERS,
  GET_LOCATIONS,
  GET_CNTRTYPES,
  SET_QUERYPARAMS
} from "../resolver";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
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
  constructor(props) {
    super(props);
    this.state = {
      isCommentOpen: false,
      inputModal: false,
      modifyModal: false,
      newRate: {
        selectedIp: [{ value: this.props.USER_ID }],
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
        initialod: this.props.rate
          ? moment(this.props.rate.offeredDate)
          : moment(),
        initialed: this.props.rate
          ? moment(this.props.rate.effectiveDate)
          : moment().endOf("month"),
        remark: this.props.rate ? this.props.rate.remark : ""
      }
    };
    this._loadClients = this._loadClients.bind(this);
    this._loadLiners = this._loadLiners.bind(this);
    this._loadPols = this._loadPols.bind(this);
    this._loadPods = this._loadPods.bind(this);
    this._loadTypes = this._loadTypes.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleTZ = this._handleTZ.bind(this);
    this._toggleComment = this._toggleComment.bind(this);
    this._closeComment = this._closeComment.bind(this);
    this._notify = this._notify.bind(this);
  }
  componentDidMount() {
    if (this.props.rate) {
      const { rate } = this.props;

      this.setState({
        newRate: {
          ...this.state.newRate,
          selectedCt: { label: rate.account.name, value: rate.account.id },
          selectedLn: { label: rate.liner.label, value: rate.liner.id },
          selectedPl: { label: rate.pol.name, value: rate.pol.id },
          selectedPd: { label: rate.pod.name, value: rate.pod.id },
          selectedTy: { label: rate.type.name, value: rate.type.id }
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
  _handleTZ = prevRate => {
    let newRate = {
      ...prevRate,
      initialod: prevRate.initialod.toString(),
      initialed: prevRate.initialed.toString()
    };
    return newRate;
  };
  _loadClients = inputValue => {
    return this._query
      .query({
        query: GET_CLIENTS,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue,
          handler: "add"
        }
      })
      .then(response => {
        let results = [];
        response.data.clients.map(ct =>
          results.push({ label: ct.name, value: ct.id })
        );
        return results;
      });
  };
  _loadLiners = inputValue => {
    return this._query
      .query({
        query: GET_LINERS,
        variables: {
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.liners.map(ln =>
          results.push({ label: ln.label, value: ln.id })
        );
        return results;
      });
  };
  _loadPols = inputValue => {
    return this._query
      .query({
        query: GET_LOCATIONS,
        variables: {
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.locations.map(lo =>
          results.push({ label: lo.name, value: lo.id })
        );
        return results;
      });
  };
  _loadPods = inputValue => {
    return this._query
      .query({
        query: GET_LOCATIONS,
        variables: {
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.locations.map(lo =>
          results.push({ label: lo.name, value: lo.id })
        );
        return results;
      });
  };
  _loadTypes = inputValue => {
    return this._query
      .query({
        query: GET_CNTRTYPES,
        variables: {
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.cntrtypes.map(ty =>
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
  _notify = (text, handler) => {
    switch (handler) {
      case "success":
        toast.success(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      case "warning":
        toast.warn(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      case "error":
        toast.error(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      case "info":
        toast.info(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      default:
        toast(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
    }
  };
  render() {
    const { isModify } = this.props;
    const { newRate } = this.state;
    return (
      <DivContainer>
        <DivHeader>
          <DivHeaderInputperson>
            <Query query={GET_ME} variables={{ uid: this.props.USER_ID }}>
              {({ loading, error, data, client }) => {
                this._query = client;
                if (loading) return null;
                if (error) return <span>Error :(</span>;

                return <span>{data.me.profile.profileName}</span>;
              }}
            </Query>
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
              selected={newRate.initialod}
              onChange={value => this._handleChange(value, "initialod")}
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
              selected={newRate.initialed}
              onChange={value => this._handleChange(value, "initialed")}
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
            >
              <textarea
                className="form-control"
                name="remark"
                value={newRate.remark}
                onChange={this._handleInput}
              />
            </Popover>
          </DivHeaderRMK>
          {isModify ? (
            <Mutation
              mutation={SET_RATE}
              variables={{
                newRate: JSON.stringify(this._handleTZ(this.state.newRate)),
                handler: "modify",
                rid: this.props.rate.id
              }}
              update={() => this._notify("수정 성공!", "success")}
            >
              {CUDRate => (
                <Mutation
                  mutation={SET_MODE}
                  variables={{
                    mode: {
                      isAdd: false,
                      isModify: false
                    }
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
                                setMode();
                                CUDRate();
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
            <Mutation
              mutation={SET_RATE}
              variables={{
                newRate: JSON.stringify(this._handleTZ(this.state.newRate)),
                handler: "add"
              }}
              refetchQueries={[
                {
                  query: GET_RATES,
                  variables: {
                    uid: this.props.USER_ID,
                    queryParams: JSON.stringify({
                      selectedIp: [],
                      selectedCt: [],
                      selectedLn: [],
                      selectedPl: [],
                      selectedPd: [],
                      selectedTy: [],
                      initialSF: moment()
                        .subtract(1, "months")
                        .startOf("month")
                        .toString(),
                      initialST: moment()
                        .add(1, "months")
                        .endOf("month")
                        .toString()
                    })
                  }
                }
              ]}
              update={() => this._notify("입력 성공!", "success")}
            >
              {cudRate => (
                <Mutation
                  mutation={SET_MODE}
                  variables={{
                    mode: {
                      isAdd: false,
                      isModify: false
                    }
                  }}
                >
                  {setMode => (
                    <Mutation
                      mutation={SET_QUERYPARAMS}
                      variables={{
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
                      }}
                    >
                      {setQueryParams => (
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
                                    setQueryParams();
                                    setMode();
                                    cudRate();
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
              )}
            </Mutation>
          )}
        </DivHeader>
      </DivContainer>
    );
  }
}

export default RateAddCard;
