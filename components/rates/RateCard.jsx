import React, { Component, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import { Query, Mutation } from "react-apollo";
import Popover from "react-simple-popover";
import ClickOutside from "../../lib/clickOutside";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SET_RATE, SET_MODE, GET_QUERYPARAMS } from "../../lib/client";
import { GET_RATES } from "../../pages/rates/ratesQueries";
// import RateAddCard from "./RateAddCard";

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
  border-bottom: 1px solid #eee;
  ${props =>
    props.isSwipe
      ? "position:absolute;left:-175px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);z-index:5;"
      : null};
  background-color: white;
`;

const DivBehind = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const DivBehindInside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
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
  background-color: white;
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

  // HEADER 높이 설정
  height: 50px;

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
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
    const { rate } = this.props;
    const { isSwipe, isModify } = this.state;
    if (isModify) {
      return null;
      // <RateAddCard USER_ID={this.props.USER_ID} isModify={true} rate={rate} />
    } else {
      return (
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
                src={
                  "/countrycity/liners_image/" + `${rate.liner.name}` + ".png"
                }
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
              {moment(rate.offeredDate).format("MM-DD")}
            </DivHeaderOD>
            <DivHeaderED>
              {moment(rate.effectiveDate).format("MM-DD")}
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
                  >
                    <p>{rate.remark}</p>
                  </Popover>
                </Fragment>
              ) : null}
            </DivHeaderRMK>
            {isSwipe ? (
              <DivHeaderButtons
                onClick={() => this.setState({ isSwipe: !this.state.isSwipe })}
              >
                <i className="fas fa-minus" style={{ color: "#c0392b" }} />
              </DivHeaderButtons>
            ) : (
              <DivHeaderButtons
                onClick={() => {
                  this.setState({ isSwipe: !this.state.isSwipe });
                }}
              >
                <i className="fas fa-plus" style={{ color: "#c0392b" }} />
              </DivHeaderButtons>
            )}
          </DivHeader>
          {/* {isSwipe ? (
            <DivBehind>
              <ClickOutside customFunc={this._hideSwipe}>
                <DivBehindInside>
                  <Query query={GET_QUERYPARAMS}>
                    {({data }) => {
                      
                      const queryParams = data.queryParams;
                      
                      return (
                        <Mutation
                          mutation={SET_RATE}
                          variables={{
                            rid: this.props.rate.id,
                            handler: "duplicate"
                          }}
                          update={() => this._notify("복제 성공!", "success")}
                        >
                          {cudRate => (
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
                                        cudRate();
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
                            this.setState({
                              modifyModal: true
                            });
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
                      if (loading) return null;
                      if (error) return <span>Error :(</span>;
                      const queryParams = data.queryParams;
                      return (
                        <Mutation
                          mutation={SET_RATE}
                          variables={{
                            uid: this.props.USER_ID,
                            rid: this.props.rate.id,
                            handler: "delete"
                          }}
                          refetchQueries={[
                            {
                              query: GET_RATES,
                              variables: {
                                uid: this.props.USER_ID,
                                queryParams: queryParams
                              }
                            }
                          ]}
                          update={() => this._notify("삭제 완료!", "success")}
                        >
                          {cudRate => (
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
                                        cudRate();
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
              </ClickOutside>
            </DivBehind>
          ) : null} */}
        </DivContainer>
      );
    }
  }
}

export default RateCard;
