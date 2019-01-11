import React, { Component, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import { Query, Mutation } from "react-apollo";
import Popover from "react-simple-popover";
import ClickOutside from "../../lib/clickOutside";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { SET_MODE, GET_QUERYPARAMS } from "../../lib/client";
import { GET_RATES, SET_RATE } from "../../pages/rates/ratesQueries";
import RateAddCard from "./RateAddCard";
import handleMomentToString from "../../utils/handleMomentToString";
import { notify } from "../../utils/notify";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 100;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #eee;
  ${props =>
    props.isSwipe
      ? "position:absolute;left:-150px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
      : null};
  background-color: white;
  z-index: 100;
`;

const DivBehind = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  ${props =>
    props.isSwipe ? "width:400px;z-index:110;" : "width:0px;z-index:90"}
  border-bottom: 1px solid #eee;
`;

const DivBehindInside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const DivBehindButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 45px;
  min-width: 45px;
  height: 50px;
  cursor: pointer;
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  ${props => (props.new ? "border-left: 5px solid #c0392b" : null)};
  background-color: white;
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: white;
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  background-color: white;
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: white;
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: white;
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
  background-color: white;
`;

const DivHeaderBS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  min-width: 200px;

  // HEADER 높이 설정
  height: 50px;

  border-left: 1px solid #eee;
  background-color: white;
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: white;
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
  background-color: white;
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: white;
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: white;
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: white;
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  background-color: white;
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  height: 50px;
  cursor: pointer;
  background-color: white;
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

class RateCard extends Component {
  state = {
    isSwipe: false,
    isModify: false,
    isCommentOpen: false,
    duplicateModal: false,
    modifyModal: false,
    deleteModal: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isModify !== this.props.isModify) {
      if (this.props.isModify === false) {
        this.setState({
          isModify: false
        });
      }
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
  _hideSwipe = () => {
    this.setState({
      isSwipe: false,
      duplicateModal: false,
      modifyModal: false,
      deleteModal: false
    });
  };

  render() {
    const { rate } = this.props;
    const { isSwipe, isModify } = this.state;
    if (isModify) {
      return (
        <RateAddCard
          loggedInUser={this.props.loggedInUser}
          isModify={true}
          rate={rate}
        />
      );
    } else {
      return (
        <ClickOutside close={this._hideSwipe}>
          <DivContainer>
            <DivHeader isSwipe={isSwipe}>
              <DivHeaderInputperson
                new={
                  moment(rate.recordedDate).format("YYYY-MM-DD") ===
                  moment().format("YYYY-MM-DD")
                    ? true
                    : false
                }
              >
                {rate.inputperson.profile.profile_name}
              </DivHeaderInputperson>
              <DivHeaderAccount>{rate.client.name}</DivHeaderAccount>
              <DivHeaderLiner>
                <img
                  src={"/static/liner_images/" + `${rate.liner.name}` + ".png"}
                  width="70px"
                  alt={rate.liner.name}
                />
              </DivHeaderLiner>
              <DivHeaderPol>{rate.pol.name}</DivHeaderPol>
              <DivHeaderPod>{rate.pod.name}</DivHeaderPod>
              <DivHeaderType>{rate.cntrtype.name}</DivHeaderType>
              <DivHeaderBS>
                <DivHeaderBSType>
                  <DivHeaderBSType20>
                    {rate.buying20
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </DivHeaderBSType20>
                  <DivHeaderBSType40>
                    {rate.buying40
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </DivHeaderBSType40>
                  <DivHeaderBSType4H>
                    {rate.buying4H
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </DivHeaderBSType4H>
                </DivHeaderBSType>
              </DivHeaderBS>
              <DivHeaderBS>
                <DivHeaderBSType>
                  <DivHeaderBSType20>
                    {rate.selling20
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </DivHeaderBSType20>
                  <DivHeaderBSType40>
                    {rate.selling40
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </DivHeaderBSType40>
                  <DivHeaderBSType4H>
                    {rate.selling4H
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </DivHeaderBSType4H>
                </DivHeaderBSType>
              </DivHeaderBS>
              <DivHeaderLF>{rate.loadingFT}</DivHeaderLF>
              <DivHeaderDF>{rate.dischargingFT}</DivHeaderDF>
              <DivHeaderOD>
                {moment
                  .utc(rate.offeredDate)
                  .local()
                  .format("MM-DD")}
              </DivHeaderOD>
              <DivHeaderED>
                {moment
                  .utc(rate.effectiveDate)
                  .local()
                  .format("MM-DD")}
              </DivHeaderED>
              <DivHeaderRMK>
                {rate.remark ? (
                  <Fragment>
                    <i
                      id={`popover${rate.id}`}
                      ref={node => (this._comment = node)}
                      onClick={this._toggleComment}
                      className="fas fa-comment"
                      style={{
                        color: "#fdc02f",
                        fontSize: 20,
                        cursor: "pointer"
                      }}
                    />
                    <Popover
                      placement="bottom"
                      target={this._comment}
                      show={this.state.isCommentOpen}
                      onHide={this._closeComment}
                      containerStyle={{
                        zIndex: 150
                      }}
                    >
                      <p>{rate.remark}</p>
                    </Popover>
                  </Fragment>
                ) : null}
              </DivHeaderRMK>

              <DivHeaderButtons
                onClick={() => {
                  this.setState({ isSwipe: true });
                }}
              >
                <i className="fas fa-plus" style={{ color: "#c0392b" }} />
              </DivHeaderButtons>
            </DivHeader>

            <DivBehind isSwipe={isSwipe}>
              <DivBehindInside>
                <DivHeaderButtons
                  onClick={() => this.setState({ isSwipe: false })}
                >
                  <i className="fas fa-minus" style={{ color: "#c0392b" }} />
                </DivHeaderButtons>
                <Query query={GET_QUERYPARAMS}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :(</div>;

                    const queryParams = data.queryParams;
                    return (
                      <Mutation
                        mutation={SET_RATE}
                        variables={{
                          handler: "duplicate",
                          rateId: this.props.rate.id
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
                          notify("복제 성공!", "success");
                        }}
                      >
                        {setRate => (
                          <Fragment>
                            <DivBehindButtons
                              onClick={() =>
                                this.setState({
                                  duplicateModal: true
                                })
                              }
                              style={{
                                backgroundColor: "#1abc9c",
                                color: "white"
                              }}
                            >
                              복제
                            </DivBehindButtons>
                            <Modal
                              open={this.state.duplicateModal}
                              onClose={() =>
                                this.setState({
                                  duplicateModal: false
                                })
                              }
                              center
                            >
                              <DivModalContainer>
                                <div>복제하시겠습니까?</div>
                                <DivModalButtons>
                                  <DivModalCancelButton
                                    onClick={() =>
                                      this.setState({
                                        duplicateModal: false
                                      })
                                    }
                                  >
                                    취소
                                  </DivModalCancelButton>
                                  <DivModalConfirmButton
                                    onClick={() => {
                                      setRate();
                                      this.setState({
                                        duplicateModal: false,
                                        isSwipe: false
                                      });
                                    }}
                                  >
                                    복제
                                  </DivModalConfirmButton>
                                </DivModalButtons>
                              </DivModalContainer>
                            </Modal>
                          </Fragment>
                        )}
                      </Mutation>
                    );
                  }}
                </Query>
                <Mutation
                  mutation={SET_MODE}
                  variables={{
                    mode: JSON.stringify({
                      isAdd: false,
                      isModify: true
                    })
                  }}
                >
                  {setMode => (
                    <Fragment>
                      <DivBehindButtons
                        onClick={() => {
                          if (
                            rate.inputperson.id ===
                            this.props.loggedInUser.data.id
                          ) {
                            this.setState({
                              modifyModal: true
                            });
                          } else {
                            notify("작성자만 수정할 수 있습니다", "error");
                          }
                        }}
                        style={{ backgroundColor: "#3498db", color: "white" }}
                      >
                        수정
                      </DivBehindButtons>
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
                                this.setState({
                                  isSwipe: false,
                                  modifyModal: false,
                                  isModify: true
                                });
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
                <Query query={GET_QUERYPARAMS}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :(</div>;

                    const queryParams = data.queryParams;
                    return (
                      <Mutation
                        mutation={SET_RATE}
                        variables={{
                          rateId: this.props.rate.id,
                          handler: "delete"
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
                          const newRatesInCache = getRates.data.edges.filter(
                            edge => edge.node.id !== setRate[0].id
                          );
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
                                  edges: newRatesInCache
                                }
                              }
                            }
                          });
                          notify("삭제 완료!", "success");
                        }}
                      >
                        {setRate => (
                          <Fragment>
                            <DivBehindButtons
                              onClick={() =>
                                this.setState({
                                  deleteModal: true
                                })
                              }
                              style={{
                                backgroundColor: "#e74c3c",
                                color: "white"
                              }}
                            >
                              삭제
                            </DivBehindButtons>
                            <Modal
                              open={this.state.deleteModal}
                              onClose={() =>
                                this.setState({
                                  deleteModal: false
                                })
                              }
                              center
                            >
                              <DivModalContainer>
                                <div>삭제하시겠습니까?</div>
                                <DivModalButtons>
                                  <DivModalCancelButton
                                    onClick={() =>
                                      this.setState({
                                        deleteModal: false
                                      })
                                    }
                                  >
                                    취소
                                  </DivModalCancelButton>
                                  <DivModalConfirmButton
                                    onClick={() => {
                                      setRate();
                                    }}
                                  >
                                    삭제
                                  </DivModalConfirmButton>
                                </DivModalButtons>
                              </DivModalContainer>
                            </Modal>
                          </Fragment>
                        )}
                      </Mutation>
                    );
                  }}
                </Query>
              </DivBehindInside>
            </DivBehind>
          </DivContainer>
        </ClickOutside>
      );
    }
  }
}

export default RateCard;
