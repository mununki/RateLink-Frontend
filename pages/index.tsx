import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGIN = gql`
  mutation {
    login(email: "wkmoon@ssshipping.co.kr", password: "1234") {
      token
    }
  }
`;

const ME = gql`
  query {
    me {
      id
      profile {
        profile_name
      }
    }
  }
`;

export default () => (
  <div>
    <Mutation mutation={LOGIN} onCompleted={data => console.log(data)}>
      {login => <button onClick={() => login()}>로그인</button>}
    </Mutation>
    <Query query={ME}>
      {({ data }) => {
        return <div>{data.me.profile.profile_name}</div>;
      }}
    </Query>
  </div>
);
