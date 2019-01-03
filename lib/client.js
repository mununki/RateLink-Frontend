import gql from "graphql-tag";
import moment from "moment";

export const GET_ISLOGIN = gql`
  query {
    isLogin @client
  }
`;

export const SET_ISLOGIN = gql`
  mutation SetIsLogin($isLogin: Boolean) {
    setIsLogin(isLogin: $isLogin) @client
  }
`;

export const GET_MODE = gql`
  query {
    mode @client
  }
`;

export const SET_MODE = gql`
  mutation setMode($mode: String) {
    setMode(mode: $mode) @client
  }
`;

export const GET_QUERYPARAMS = gql`
  query {
    queryParams @client
  }
`;

export const SET_QUERYPARAMS = gql`
  mutation setQP($queryParams: String) {
    setQueryParams(queryParams: $queryParams) @client
  }
`;

export const defaults = {
  isLogin: false,
  mode: {
    isAdd: false,
    isModify: false
  },
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
};

export const resolvers = {
  Mutation: {
    setIsLogin: (_, variables, { cache }) => {
      cache.writeQuery({
        query: GET_ISLOGIN,
        data: {
          isLogin: variables.isLogin
        }
      });
      return null;
    },
    setMode: (_, variables, { cache }) => {
      cache.writeQuery({
        query: GET_MODE,
        data: {
          mode: JSON.parse(variables.mode)
        }
      });
      return null;
    },
    setQueryParams: (_, variables, { cache }) => {
      cache.writeQuery({
        query: GET_QUERYPARAMS,
        data: {
          queryParams: variables.queryParams
        }
      });
      return null;
    }
  }
};
