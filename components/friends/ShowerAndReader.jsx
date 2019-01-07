import React from "react";
import UserCard from "./UserCard";

export default class ShowerAndReader extends React.Component {
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
              return (
                <UserCard key={shower.id} user={shower} onlyShower={true} />
              );
            } else {
              return (
                <UserCard key={shower.id} user={shower} onlyShower={false} />
              );
            }
          })}
        </div>
        <div className="readers-container">
          {readers.map(reader => (
            <UserCard key={reader.id} user={reader} removeButton={true} />
          ))}
        </div>
      </div>
    );
  }
}
