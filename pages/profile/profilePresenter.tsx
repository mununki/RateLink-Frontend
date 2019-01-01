import React from "react";
import { withApollo, Mutation } from "react-apollo";
import UpdateProfile from "./profileQueries";

class Profile extends React.Component {
  state = {
    profile_name: "",
    company: "",
    job_boolean: 0,
    image: ""
  };
  componentDidMount() {
    const {
      profile_name,
      company,
      job_boolean,
      image
    } = this.props.loggedInUser.data.profile;
    this.setState({
      profile_name,
      company,
      job_boolean: job_boolean === "" ? "0" : job_boolean,
      image
    });
  }
  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { profile_name, company, job_boolean, image } = this.state;
    return (
      <div>
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
        <select
          name="job_boolean"
          value={job_boolean}
          onChange={this._handleChange}
        >
          <option value="0">-</option>
          <option value="1">선사</option>
          <option value="2">포워더</option>
          <option value="3">기타</option>
        </select>
        <Mutation mutation={UpdateProfile} variables={this.state}>
          {updateProfile => <button onClick={updateProfile}>저장</button>}
        </Mutation>
      </div>
    );
  }
}

export default withApollo(Profile);
