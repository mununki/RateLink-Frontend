import React from "react";
import checkLogin from "../lib/checkLogin";
import { ApolloConsumer } from "react-apollo";
import { __APOLLO_CLIENT__ } from "../lib/initApollo";
import logout from "../lib/logout";
import Link from "next/link";

class Index extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
    }

    return { loggedInUser };
  }

  render() {
    return (
      <div className="padding-global-top">
        <Link href="/login">
          <a>로그인</a>
        </Link>
        <ApolloConsumer>
          {client => <button onClick={logout(client)}>로그아웃</button>}
        </ApolloConsumer>
      </div>
    );
  }
}

export default Index;
