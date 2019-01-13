import React from "react";
import { withApollo, Mutation } from "react-apollo";
import { UPDATE_PROFILE, UPDATE_PROFILE_IMAGE } from "./profileQueries";
import { notify } from "../../utils/notify";

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
  _handleFileChange = e => {
    const {
      target: {
        validity,
        files: [file]
      }
    } = e;
    validity.valid &&
      this.props.client
        .mutate({
          mutation: UPDATE_PROFILE_IMAGE,
          variables: { file }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
  };

  render() {
    const { profile_name, company, job_boolean, image } = this.state;
    return (
      <div className="height-full-align-middle">
        <div className="container">
          <div className="row">
            <div className="left-panel col-12 col-sm-4 col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="col-6 col-sm-12 col-lg-8 mx-auto">
                    <img
                      src={`/static/profile_images/profile_image_1.jpg`}
                      className="img-fluid img-thumbnail rounded-circle"
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="m-3 text-center">{profile_name}</div>
                  <input
                    type="file"
                    name="profile-image"
                    onChange={this._handleFileChange}
                  />
                  <div className="text-center">
                    <span>Tellers | Readers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-panel col-12 col-sm-8 col-md-9">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">프로필 관리</h5>
                  <div className="form-group m-2">
                    <label htmlFor="profile_name">별명</label>
                    <input
                      type="text"
                      id="profile_name"
                      name="profile_name"
                      className="form-control"
                      value={profile_name}
                      onChange={this._handleChange}
                    />
                  </div>
                  <div className="form-group m-2">
                    <label htmlFor="company">회사 이름</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="form-control"
                      value={company}
                      onChange={this._handleChange}
                    />
                  </div>
                  <div className="form-group m-2">
                    <label htmlFor="job_boolean">회사 유형</label>
                    <select
                      name="job_boolean"
                      id="job_boolean"
                      className="form-control"
                      value={job_boolean}
                      onChange={this._handleChange}
                    >
                      <option value="0">(선택없음)</option>
                      <option value="1">선사</option>
                      <option value="2">포워더</option>
                      <option value="3">기타</option>
                    </select>
                  </div>
                  <Mutation
                    mutation={UPDATE_PROFILE}
                    variables={this.state}
                    onCompleted={({ updateProfile }) => {
                      if (updateProfile.ok) {
                        notify("저장 완료", "success");
                      } else {
                        notify(`에러 발생 ${updateProfile.error}`, "error");
                      }
                    }}
                  >
                    {updateProfile => (
                      <button
                        className="btn btn-primary m-2"
                        onClick={updateProfile}
                      >
                        저장
                      </button>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(Profile);
