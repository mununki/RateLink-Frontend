import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
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
      `
    })
    .then(({ data: { me } }) => {
      console.log("checkLogin", me.ok);
      return { loggedInUser: me };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: me };
    });
