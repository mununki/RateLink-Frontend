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
    <div className="usercard-container">
      {user.profile.profile_name + user.id}
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
            <div>
              <button onClick={addRateReader}>추가</button>
            </div>
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
          {removeRateReader => <button onClick={removeRateReader}>제거</button>}
        </Mutation>
      )}
    </div>
  );
};
