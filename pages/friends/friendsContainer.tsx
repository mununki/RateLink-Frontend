import React from "react";
import FriendsPresenter from "./friendsPresenter";
import checkLogin from "../../lib/checkLogin";
import redirect from "../../lib/redirect";
import Layout from "../../components/Layout";
import { Query } from "react-apollo";
import { GET_SHOWERS, GET_READERS, FIND_USERS } from "./friendsQueries";

class FriendsContainer extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLogin(context.apolloClient);

    if (!loggedInUser.ok) {
      redirect(context, "/login");
    }

    return { loggedInUser };
  }
  render() {
    return (
      <Layout loggedInUser={this.props.loggedInUser}>
        <Query query={GET_SHOWERS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
            const showers = data.getShowers;

            return (
              <Query query={GET_READERS}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading...</div>;
                  if (error) return <div>Error :(</div>;
                  const readers = data.getReaders;

                  return (
                    <FriendsPresenter
                      loggedInUser={this.props.loggedInUser}
                      showers={showers}
                      readers={readers}
                    />
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default FriendsContainer;
