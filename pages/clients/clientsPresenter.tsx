import moment from "moment";
import React, { useEffect, useState } from "react";
import { Mutation, Query, withApollo } from "react-apollo";
import Modal from "react-responsive-modal";
import { IInitialProps } from "../../types/custom";
import { notify } from "../../utils/notify";
import useHandleInput from "../../utils/useHandleInput";
import { GET_MY_CLIENT, GET_MY_CLIENTS, SAVE_MY_CLIENT, UPDATE_MY_CLIENT } from "./clientsQueries";
import ClickOutside from "../../lib/clickOutside";

const SaveClientForm = ({ itemsOfPage, clientName, clientRemark, setModalOpen }) => {
  return (
    <Mutation
      mutation={SAVE_MY_CLIENT}
      variables={{
        name: clientName.value,
        remark: clientRemark.value
      }}
      update={(cache, { data: { saveMyClient } }) => {
        const clients = cache.readQuery({
          query: GET_MY_CLIENTS,
          variables: {
            skip: 0,
            first: itemsOfPage,
            search: ""
          }
        });
        if (clients && clients.getMyClients) {
          if (saveMyClient.ok) {
            const newClients = {
              ...clients,
              getMyClients: {
                ...clients.getMyClients,
                data: {
                  ...clients.getMyClients.data,
                  edges: [
                    { cursor: saveMyClient.client.id, node: saveMyClient.client, __typename: "Rate_clientEdge" },
                    ...clients.getMyClients.data.edges
                  ]
                }
              }
            };
            cache.writeQuery({
              query: GET_MY_CLIENTS,
              variables: {
                skip: 0,
                first: itemsOfPage,
                search: ""
              },
              data: newClients
            });
            notify("Successfully saved!", "success");
            setModalOpen(false);
          } else {
            notify(saveMyClient.error, "error");
          }
        }
      }}
    >
      {saveMyClient => (
        <div className="mt-3">
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input name="clientName" type="text" className="form-control" {...clientName} />
          </div>
          <div className="form-group">
            <label htmlFor="clientRemark">Remarks</label>
            <input name="clientRemark" type="text" className="form-control" {...clientRemark} />
          </div>
          <button className="btn btn-primary" onClick={() => saveMyClient()}>
            Save
          </button>
        </div>
      )}
    </Mutation>
  );
};

const EditClientForm = withApollo(props => {
  const { radioInputValue, clientName, clientRemark, setModalOpen, client } = props;
  useEffect(() => {
    client
      .query({
        query: GET_MY_CLIENT,
        variables: {
          clientId: radioInputValue
        }
      })
      .then(({ loading, error, data }) => {
        if (!loading && data && data.getMyClient.ok) {
          clientName.onChange({ currentTarget: { value: data.getMyClient.client.name } });
          clientRemark.onChange({ currentTarget: { value: data.getMyClient.client.remarks } });
        } else {
          notify(data.getMyClient.error, "error");
        }
      });
  }, []);

  return (
    <Mutation
      mutation={UPDATE_MY_CLIENT}
      variables={{
        clientId: radioInputValue,
        name: clientName.value,
        remark: clientRemark.value
      }}
      onCompleted={data => {
        if (data.updateMyClient.ok) {
          notify("Successfully saved!", "success");
          setModalOpen(false);
        } else {
          notify(data.updateMyClient.error, "error");
        }
      }}
    >
      {updateMyClient => (
        <div className="mt-3">
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input name="clientName" type="text" className="form-control" {...clientName} />
          </div>
          <div className="form-group">
            <label htmlFor="clientRemark">Remarks</label>
            <input name="clientRemark" type="text" className="form-control" {...clientRemark} />
          </div>
          <button className="btn btn-primary" onClick={() => updateMyClient()}>
            Save
          </button>
        </div>
      )}
    </Mutation>
  );
});

const PaginationPanel = ({ count, itemsOfPage, currentPage, setCurrentPage }) => {
  const totalNoOfPagesArray = Array.from(Array(Math.ceil(count / itemsOfPage)).keys()).reverse();
  const tier = Math.floor(currentPage / 5);
  const index = currentPage % 5;
  const start = tier * 5;
  const end = start + 5;
  return (
    <div className="d-flex justify-content-center mt-3 mb-5">
      {tier * 5 - 1 > 0 && (
        <div className="pageNo" onClick={() => setCurrentPage(tier * 5 - 1)}>
          &lt;
        </div>
      )}
      {totalNoOfPagesArray.slice(start, end).map((page, i) => {
        if (i === index) {
          return (
            <div key={page + 1} className="font-weight-bold mx-1">
              {page + 1}
            </div>
          );
        } else {
          return (
            <div key={page + 1} className="text-muted mx-1 pageNo" onClick={() => setCurrentPage(tier * 5 + i)}>
              {page + 1}
            </div>
          );
        }
      })}
      {tier * 5 + 5 <= totalNoOfPagesArray[0] && (
        <div className="pageNo" onClick={() => setCurrentPage(tier * 5 + 5)}>
          &gt;
        </div>
      )}
      <style jsx>
        {`
          .pageNo:hover {
            color: black;
            font-weight: bold;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default ({ loggedInUser }: IInitialProps) => {
  const search = useHandleInput("");
  const clientName = useHandleInput("");
  const clientRemark = useHandleInput("");
  const [itemsOfPage, setItemsOfPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [radioInputValue, setRadioInputValue] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="padding-global-top">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-sm-6 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-search" />
                </span>
              </div>
              <input type="text" className="form-control" {...search} placeholder="Search" />
            </div>
          </div>
          <div className="col-12 col-sm-6 text-right my-1">
            <button
              className="btn btn-secondary mx-1"
              onClick={() => {
                setIsEdit(true);
                radioInputValue ? setModalOpen(!isModalOpen) : notify("Select a client to modify", "warning");
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-primary ml-1"
              onClick={() => {
                setIsEdit(false);
                setModalOpen(!isModalOpen);
              }}
            >
              New
            </button>
            <Modal open={isModalOpen} onClose={() => setModalOpen(false)} center>
              {isEdit ? (
                <EditClientForm
                  radioInputValue={radioInputValue}
                  clientName={clientName}
                  clientRemark={clientRemark}
                  setModalOpen={setModalOpen}
                />
              ) : (
                <SaveClientForm
                  itemsOfPage={itemsOfPage}
                  clientName={clientName}
                  clientRemark={clientRemark}
                  setModalOpen={setModalOpen}
                />
              )}
            </Modal>
          </div>
        </div>
        <div className="row justify-content-between text-center p-2 border-top border-bottom text-white bg-dark">
          <div className="col client-radio">
            <i className="fas fa-check-circle text-success" />
          </div>
          <div className="col">NAME</div>
          <div className="col">REMARKS</div>
          <div className="col client-date">DATE</div>
        </div>
        <Query
          query={GET_MY_CLIENTS}
          variables={{ skip: itemsOfPage * currentPage, first: itemsOfPage, search: search.value }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              );
            }
            if (error) {
              return <div>Error :(</div>;
            }

            return (
              <>
                {data.getMyClients.data.edges.map(client => (
                  <div
                    key={client.node.id}
                    className="row justify-content-between text-center p-2 bg-white border-bottom"
                    onClick={() => setRadioInputValue(client.node.id)}
                  >
                    <div className="col client-radio">
                      <input
                        type="radio"
                        checked={radioInputValue === client.node.id}
                        onChange={() => setRadioInputValue(client.node.id)}
                      />
                    </div>
                    <div className="col">{client.node.name}</div>
                    <div className="col">{client.node.remarks}</div>
                    <div className="col client-date">{moment(client.node.recordedDate).format("YYYY-MM-DD")}</div>
                  </div>
                ))}
                <div className="client-footer-container">
                  <PaginationPanel
                    count={data.getMyClients.count}
                    itemsOfPage={itemsOfPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </>
            );
          }}
        </Query>
      </div>
      <style jsx>{`
        .client-radio {
          -ms-flex: 0 0 30px;
          flex: 0 0 30px;
        }
        .client-date {
          -ms-flex: 0 0 120px;
          flex: 0 0 120px;
        }
      `}</style>
    </div>
  );
};
