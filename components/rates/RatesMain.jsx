import React from "react";
import styled from "styled-components";
import { Query, Mutation, withApollo } from "react-apollo";
import RateCard from "./RateCard";
import RatesReadmore from "./RatesReadmore";
import { GET_MODE, SET_MODE, GET_QUERYPARAMS } from "../../lib/client";
import { GET_RATES } from "../../pages/rates/ratesQueries";
import moment from "moment";
import handleMomentToString from "../../utils/handleMomentToString";
import RateAddCard from "./RateAddCard";
import { notify } from "../../utils/notify";
import "../../static/css/fixedheader.css";

const RateAddButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 150;
  color: white;
  padding: 10px 20px 10px 20px;
  background-color: ${props =>
    props.isAdd ? "rgba(231, 76, 60, 1.0)" : props.isModify ? "rgba(231, 76, 60, 1.0)" : "rgba(52, 152, 219, 1)"};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isAdd ? "rgba(192, 57, 43, 1.0)" : props.isModify ? "rgba(192, 57, 43, 1.0)" : "rgba(41, 128, 185, 1)"};
  }
`;

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 1rem;
`;

class RatesMain extends React.Component {
  state = {
    isLoading: false
  };

  render() {
    return (
      <Query query={GET_MODE}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          const isAdd = data.mode.isAdd;
          const isModify = data.mode.isModify;

          return (
            <div className="container-fluid" ref={this.props.ratesMain}>
              {isAdd ? <RateAddCard loggedInUser={this.props.loggedInUser} isModify={false} /> : null}

              <Query query={GET_QUERYPARAMS}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading...</div>;
                  if (error) return <div>Error :(</div>;

                  const queryParams = data.queryParams;
                  return (
                    <Query
                      query={GET_RATES}
                      variables={{
                        first: 20,
                        queryParams: JSON.stringify(handleMomentToString(queryParams)),
                        after: null
                      }}
                    >
                      {({ loading, error, data, fetchMore }) => {
                        if (loading)
                          return (
                            <DivContainer>
                              <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </DivContainer>
                          );
                        if (error) return <div>Error :(</div>;

                        const rates = data.getRates.data.edges;
                        const pageInfo = data.getRates.data.pageInfo;

                        return (
                          <React.Fragment>
                            {rates.map(edge => (
                              <RateCard
                                key={edge.node.id}
                                loggedInUser={this.props.loggedInUser}
                                rate={edge.node}
                                isModify={isModify}
                              />
                            ))}

                            {/* READMORE BUTTON */}

                            <RatesReadmore
                              isLoading={this.state.isLoading}
                              onLoadMore={() => {
                                this.setState({ isLoading: true });
                                fetchMore({
                                  query: GET_RATES,
                                  variables: {
                                    first: 20,
                                    queryParams: JSON.stringify(handleMomentToString(queryParams)),
                                    after: pageInfo.endCursor
                                  },
                                  updateQuery: (previousResult, { fetchMoreResult }) => {
                                    if (!fetchMoreResult.getRates.data.pageInfo.hasNextPage)
                                      notify("Last Page!", "info");
                                    this.setState({
                                      isLoading: false
                                    });
                                    return fetchMoreResult.getRates.data.edges.length > 0
                                      ? {
                                          getRates: {
                                            ok: true,
                                            data: {
                                              pageInfo: fetchMoreResult.getRates.data.pageInfo,
                                              edges: [
                                                ...previousResult.getRates.data.edges,
                                                ...fetchMoreResult.getRates.data.edges
                                              ],
                                              __typename: "Rate_rateConnection"
                                            },
                                            error: null,
                                            __typename: "RateResponse"
                                          }
                                        }
                                      : previousResult;
                                  }
                                });
                              }}
                              hasNextPage={pageInfo.hasNextPage}
                            />
                          </React.Fragment>
                        );
                      }}
                    </Query>
                  );
                }}
              </Query>
              <Mutation
                mutation={SET_MODE}
                variables={{
                  mode: JSON.stringify({
                    isAdd: isModify ? false : !isAdd,
                    isModify: false
                  })
                }}
              >
                {setMode => (
                  <RateAddButton isAdd={isAdd} isModify={isModify} onClick={() => setMode()}>
                    {!isAdd ? (!isModify ? "NEW" : "CANCEL") : "CANCEL"}
                  </RateAddButton>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default RatesMain;
