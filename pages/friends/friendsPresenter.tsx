import React from "react";
import { Query } from "react-apollo";
import { GET_SHOWERS, GET_READERS } from "./friendsQueries";
import UserCard from "../../components/friends/UserCard";

class ShowerAndReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlyShowers: this._checkOnlyShower()
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.readers !== this.props.readers) {
      this.setState({
        onlyShowers: this._checkOnlyShower()
      });
    }
  }
  _checkOnlyShower = () => {
    // find the only showers who is not added as reader yet
    const { showers, readers } = this.props;
    const onlyShowers = showers.filter(
      shower => readers.filter(reader => reader.id === shower.id).length < 1
    );
    return onlyShowers;
  };
  render() {
    const { showers, readers } = this.props;
    const { onlyShowers } = this.state;
    return (
      <div className="friends-container">
        <div className="showers-container">
          {showers.map(shower => {
            if (
              onlyShowers.length > 0 &&
              onlyShowers.filter(onlyshower => onlyshower.id === shower.id)
                .length > 0
            ) {
              console.log("true");
              return (
                <UserCard key={shower.id} user={shower} onlyShower={true} />
              );
            } else {
              console.log("false");
              return (
                <UserCard key={shower.id} user={shower} onlyShower={false} />
              );
            }
          })}
        </div>
        <div className="readers-container">
          {readers.map(reader => (
            <UserCard key={reader.id} user={reader} />
          ))}
        </div>
      </div>
    );
  }
}

const FriendsPresenter = ({ loggedInUser }) => {
  return (
    <div className="padding-global-top">
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
                return <ShowerAndReader showers={showers} readers={readers} />;
              }}
            </Query>
          );
        }}
      </Query>
    </div>
  );
};

export default FriendsPresenter;
