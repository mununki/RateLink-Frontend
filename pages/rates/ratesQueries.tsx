import gql from "graphql-tag";

export const FRAGMENT_RATE = gql`
  fragment FragmentRate on Rate {
    id
    inputperson {
      id
      profile {
        profile_name
      }
    }
    client {
      id
      name
    }
    liner {
      id
      name
      label
    }
    pol {
      id
      name
    }
    pod {
      id
      name
    }
    cntrtype {
      id
      name
    }
    buying20
    buying40
    buying4H
    selling20
    selling40
    selling4H
    loadingFT
    dischargingFT
    offeredDate
    effectiveDate
    recordedDate
    remark
  }
`;

export const GET_RATES = gql`
  query GetRates(
    $before: String
    $last: Int
    $after: String
    $first: Int
    $queryParams: String
  ) {
    getRates(
      before: $before
      last: $last
      after: $after
      first: $first
      queryParams: $queryParams
    ) {
      ok
      data {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            ...FragmentRate
          }
          cursor
        }
      }
      error
    }
  }
  ${FRAGMENT_RATE}
`;

export const SET_RATE = gql`
  mutation SetRate($handler: String!, $rateId: Int, $newRate: String) {
    setRate(handler: $handler, rateId: $rateId, newRate: $newRate) {
      ...FragmentRate
    }
  }
  ${FRAGMENT_RATE}
`;

export const GET_INPUTPERSONS = gql`
  query GetInputpersons($search: String) {
    getInputpersons(search: $search) {
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
  }
`;

export const GET_CLIENTS = gql`
  query GetClients($search: String) {
    getClients(search: $search) {
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
  }
`;

export const GET_LINERS = gql`
  query GetLiners($search: String, $showOurs: Boolean) {
    getLiners(search: $search, showOurs: $showOurs) {
      id
      name
      label
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($search: String, $showOurs: Boolean, $polOrPod: String) {
    getLocations(search: $search, showOurs: $showOurs, polOrPod: $polOrPod) {
      id
      name
    }
  }
`;

export const GET_CNTRTYPES = gql`
  query GetCNTRtypes($search: String, $showOurs: Boolean) {
    getCNTRtypes(search: $search, showOurs: $showOurs) {
      id
      name
    }
  }
`;
