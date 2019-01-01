import gql from "graphql-tag";

const UpdateProfile = gql`
  mutation UpdateProfile(
    $profile_name: String!
    $company: String
    $job_boolean: String
    $image: String
  ) {
    updateProfile(
      profile_name: $profile_name
      company: $company
      job_boolean: $job_boolean
      image: $image
    ) {
      ok
      data {
        id
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

export default UpdateProfile;
