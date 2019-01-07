import React from "react";
import { Query, withApollo } from "react-apollo";
import { FIND_USERS } from "../../pages/friends/friendsQueries";
import UserCard from "./UserCard";

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
    this.setState({
      findUsers
    });
  };
  render() {
    const { email, nickname, profile_name, company, findUsers } = this.state;
    return (
      <div>
        <form onSubmit={this._triggerToSearch}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this._handleChange}
          />
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={this._handleChange}
          />
          <input
            type="text"
            name="profile_name"
            value={profile_name}
            onChange={this._handleChange}
          />
          <input
            type="text"
            name="company"
            value={company}
            onChange={this._handleChange}
          />
          <button>찾기</button>
        </form>
        {findUsers.map(user => (
          <UserCard key={user.id} user={user} onlyShower={true} />
        ))}
      </div>
    );
  }
}

export default withApollo(FindUsers);
