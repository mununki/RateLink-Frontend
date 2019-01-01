import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $nickname: String!) {
    signup(email: $email, password: $password, nickname: $nickname) {
      ok
      data {
        token
      }
      error
    }
  }
`;
