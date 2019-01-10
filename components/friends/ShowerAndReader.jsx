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
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="card mb-3">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <div className="nav-link active" href="#">
                      Teller
                    </div>
                  </li>
                  <li className="my-auto">
                    <i className="fas fa-arrow-right mx-2 text-success" />{" "}
                    {`${this.props.loggedInUser.data.profile.profile_name}님`}
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {showers.map(shower => {
                  if (
                    onlyShowers.length > 0 &&
                    onlyShowers.filter(
                      onlyshower => onlyshower.id === shower.id
                    ).length > 0
                  ) {
                    return (
                      <UserCard
                        key={shower.id}
                        user={shower}
                        onlyShower={true}
                      />
                    );
                  } else {
                    return (
                      <UserCard
                        key={shower.id}
                        user={shower}
                        onlyShower={false}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="my-auto">
                    {`${this.props.loggedInUser.data.profile.profile_name}님`}
                    <i className="fas fa-arrow-right mx-2 text-success" />{" "}
                  </li>
                  <li className="nav-item">
                    <div className="nav-link active" href="#">
                      Reader
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {readers.map(reader => (
                  <UserCard key={reader.id} user={reader} removeButton={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
