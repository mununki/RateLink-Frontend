import { Mutation } from "react-apollo";
import { ADD_READERS, GET_READERS } from "../../pages/friends/friendsQueries";

export default ({ user, onlyShower }) => {
  // Props
  // =================
  // user: [User]!
  // onlyShower: [User]
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
        >
          {addRateReader => {
            return (
              <div>
                <button onClick={addRateReader}>추가</button>
              </div>
            );
          }}
        </Mutation>
      )}
    </div>
  );
};
