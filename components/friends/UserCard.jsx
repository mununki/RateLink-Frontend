import { Mutation } from "react-apollo";
import {
  ADD_READERS,
  GET_READERS,
  REMOVE_READERS
} from "../../pages/friends/friendsQueries";

export default ({ user, onlyShower, removeButton }) => {
  // Props
  // =================
  // user: [User]!
  // onlyShower: boolean
  // removeButton: boolean
  return (
    <div className="usercard-container m-2">
      <img
        className="img-fluid rounded-circle friends-profile-image"
        src={
          user.profile.image === "" || !user.profile.image
            ? "/static/profile_images/dummy.png"
            : process.env.AWS_S3_ENDPOINT + user.profile.image
        }
      />
      <span className="mx-2">{user.profile.profile_name}</span>

      {onlyShower && (
        <Mutation
          mutation={ADD_READERS}
          variables={{ userId: user.id }}
          update={(cache, { data }) => {
            const readers = cache.readQuery({
              query: GET_READERS
            });
            cache.writeQuery({
              query: GET_READERS,
              data: {
                getReaders: [...readers.getReaders, data.addRateReader]
              }
            });
          }}
          onError={error => {
            if (error.message === "GraphQL error: Already added")
              console.log("!!"); // Notification needs
          }}
        >
          {addRateReader => (
            <button className="btn btn-warning btn-sm" onClick={addRateReader}>
              <i className="fas fa-plus" />
            </button>
          )}
        </Mutation>
      )}
      {removeButton && (
        <Mutation
          mutation={REMOVE_READERS}
          variables={{ userId: user.id }}
          update={(cache, { data }) => {
            const readers = cache.readQuery({
              query: GET_READERS
            });
            const newReaders = readers.getReaders.filter(
              reader => reader.id !== data.removeRateReader.id
            );
            cache.writeQuery({
              query: GET_READERS,
              data: {
                getReaders: newReaders
              }
            });
          }}
          onError={error => {
            console.log("!!"); // Notification needs
          }}
        >
          {removeRateReader => (
            <button
              className="btn btn-danger btn-sm"
              onClick={removeRateReader}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Mutation>
      )}

      <style jsx>
        {`
          .friends-profile-image {
            width: 32px;
          }
        `}
      </style>
    </div>
  );
};
