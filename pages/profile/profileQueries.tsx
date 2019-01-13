import gql from "graphql-tag";

export const UPDATE_PROFILE = gql`
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

export const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($file: Upload!) {
    updateProfileImage(file: $file) {
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
