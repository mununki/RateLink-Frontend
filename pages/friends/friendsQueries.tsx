import gql from "graphql-tag";

export const GET_SHOWERS = gql`
  query GetShowers {
    getShowers {
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

export const GET_READERS = gql`
  query GetReaders {
    getReaders {
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

export const ADD_READERS = gql`
  mutation AddRateReader($userId: Int!) {
    addRateReader(userId: $userId) {
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

export const REMOVE_READERS = gql`
  mutation RemoveRateReader($userId: Int!) {
    removeRateReader(userId: $userId) {
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
