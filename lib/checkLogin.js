import gql from "graphql-tag";

export const ME = gql`
  query {
    me {
      ok
      data {
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
      error
    }
  }
`;

export default apolloClient =>
  apolloClient
    .query({
      query: ME
    })
    .then(({ data: { me } }) => {
      return { loggedInUser: me };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: me };
    });
