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
    if (findUsers.length < 1)
      notify("일치하는 유저를 찾을 수 없습니다", "info");
    this.setState({
      findUsers
    });
  };
  render() {
    const { email, nickname, profile_name, company, findUsers } = this.state;
    return (
      <div className="container">
        <div className="card mb-2">
          <div className="card-header">친구 찾기</div>
          <div className="card-body">
            <form onSubmit={this._triggerToSearch}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">
                    Email <span className="text-danger">(*필수)</span>
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
                    이름 <span className="text-danger">(*필수)</span>
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
                  <label htmlFor="profile_name">닉네임</label>
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
                  <label htmlFor="company">회사이름</label>
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
                찾기
              </button>
            </form>
          </div>
          <div className="m-3">
            {findUsers.length > 0 && (
              <div className="alert alert-light" role="alert">
                <h4 className="alert-heading">검색 결과</h4>
                <p>
                  추가 버튼을 누르면 해당 유저에게 저장된 운임이 공유되어
                  보여집니다. 하지만 반대로, 해당 유저의 운임은 보이지 않습니다.
                  상대방 유저에게 같은 방법으로 운임 공유를 요청하세요.
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
