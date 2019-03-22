import React from "react";
import { Query, withApollo } from "react-apollo";
import { FIND_USERS } from "../../pages/friends/friendsQueries";
import UserCard from "./UserCard";
import { notify } from "../../utils/notify";

class FindUsers extends React.Component {
  state = {
    email: "",
    nickname: "",
    profile_name: "",
    company: "",
    findUsers: []
  };
  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  _triggerToSearch = async e => {
    e.preventDefault();
    e.stopPropagation();

    const { email, nickname, profile_name, company } = this.state;
    const {
      data: { findUsers }
    } = await this.props.client.query({
      query: FIND_USERS,
      variables: { email, nickname, profile_name, company }
    });
    if (findUsers.length < 1) notify("No matched found", "info");
    this.setState({
      findUsers
    });
  };
  render() {
    const { email, nickname, profile_name, company, findUsers } = this.state;
    return (
      <div className="container">
        <div className="card mb-2">
          <div className="card-header">Find a friend</div>
          <div className="card-body">
            <form onSubmit={this._triggerToSearch}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">
                    Email <span className="text-danger">(*required)</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={this._handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="nickname">
                    Name <span className="text-danger">(*required)</span>
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    className="form-control"
                    value={nickname}
                    onChange={this._handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="profile_name">Nickname</label>
                  <input
                    type="text"
                    id="profile_name"
                    name="profile_name"
                    className="form-control"
                    value={profile_name}
                    onChange={this._handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-control"
                    value={company}
                    onChange={this._handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Find
              </button>
            </form>
          </div>
          <div className="m-3">
            {findUsers.length > 0 && (
              <div className="alert alert-light" role="alert">
                <h4 className="alert-heading">Found!</h4>
                <p>
                  If you click <mark>add</mark> button, your saved rates will be shown to the friend. But, you CAN NOT
                  see your friend's rates.
                  <br /> If you want to see your friends' rates, then ask them.
                </p>
                <hr />
                {findUsers.map(user => (
                  <UserCard key={user.id} user={user} onlyShower={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(FindUsers);
