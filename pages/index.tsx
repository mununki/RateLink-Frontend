import React from "react";
import Link from "next/link";
import checkLogin from "../lib/checkLogin";
import { ApolloConsumer } from "react-apollo";
import { __APOLLO_CLIENT__ } from "../lib/initApollo";
import logout from "../lib/logout";

class Index extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
      // If not signed in, send them somewhere more useful
      console.log("not logged in");
    }

    return { loggedInUser };
  }

  render() {
    return (
      <>
        <p>
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </p>
        {this.props.loggedInUser.ok && this.props.loggedInUser.data.nickname}
        <ApolloConsumer>
          {client => <button onClick={logout(client)}>로그아웃</button>}
        </ApolloConsumer>
      </>
    );
  }
}

export default Index;
