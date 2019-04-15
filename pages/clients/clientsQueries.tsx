import gql from "graphql-tag";

export const FRAGMENT_CLIENT = gql`
  fragment FragmentClient on Client {
    id
    name
    salesman {
      id
      email
      nickname
      profile {
        profile_name
        company
        job_boolean
        image
      }
    }
    remarks
    recordedDate
  }
`;
export const GET_MY_CLIENTS = gql`
  query GetMyClients($skip: Int, $before: String, $last: Int, $after: String, $first: Int, $search: String) {
    getMyClients(skip: $skip, before: $before, last: $last, after: $after, first: $first, search: $search) {
      ok
      error
      count
      data {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            ...FragmentClient
          }
          cursor
        }
      }
    }
  }
  ${FRAGMENT_CLIENT}
`;

export const GET_MY_CLIENT = gql`
  query GetMyClient($clientId: Int!) {
    getMyClient(clientId: $clientId) {
      ok
      error
      client {
        ...FragmentClient
      }
    }
  }
  ${FRAGMENT_CLIENT}
`;

export const SAVE_MY_CLIENT = gql`
  mutation SaveMyClient($name: String!, $remark: String) {
    saveMyClient(name: $name, remark: $remark) {
      ok
      error
      client {
        ...FragmentClient
      }
    }
  }
  ${FRAGMENT_CLIENT}
`;

export const UPDATE_MY_CLIENT = gql`
  mutation UpdateMyClient($clientId: Int!, $name: String, $remark: String) {
    updateMyClient(clientId: $clientId, name: $name, remark: $remark) {
      ok
      error
      client {
        ...FragmentClient
      }
    }
  }
  ${FRAGMENT_CLIENT}
`;
