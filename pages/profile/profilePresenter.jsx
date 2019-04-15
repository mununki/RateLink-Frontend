import React from "react";
import { withApollo, Query, Mutation } from "react-apollo";
import Modal from "react-responsive-modal";
import { UPDATE_PROFILE, UPDATE_PROFILE_IMAGE } from "./profileQueries";
import { notify } from "../../utils/notify";
import AwesomeCropper from "../../components/profile/AvatarCanvas";
import { ME } from "../../lib/checkLogin";

class Profile extends React.Component {
  state = {
    avatarEditorModal: false
  };

  _openAvatarEditor = () => {
    this.setState({
      avatarEditorModal: true
    });
  };

  _closeAvatarEditor = () => {
    this.setState({
      avatarEditorModal: false
    });
  };

  _handleUploadToS3 = blob => {
    this.props.client
      .mutate({
        mutation: UPDATE_PROFILE_IMAGE,
        variables: { file: blob }
      })
      .then(data => {
        notify("Saved!", "success");
      })
      .catch(err => notify("Try again", "error"));
  };

  render() {
    const { profile_name, company, job_boolean, image } = this.props.profile;
    return (
      <div className="height-full-align-middle">
        <div className="container">
          <Modal open={this.state.avatarEditorModal} onClose={this._closeAvatarEditor} center>
            <AwesomeCropper
              aspectRatio={4 / 4}
              upload={this._handleUploadToS3}
              closeModal={this._closeAvatarEditor}
              containerStyle={{
                marginTop: "1rem",
                maxHeight: "50vh",
                minHeight: "50vh",
                padding: "1rem",
                overflow: "hidden"
              }}
            />
          </Modal>
          <div className="row">
            <div className="left-panel col-12 col-sm-4 col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="col-6 col-sm-12 col-lg-8 mx-auto">
                    <Query query={ME}>
                      {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) return <div>Error :(</div>;
                        return (
                          <div className="container-profile-image" onClick={this._openAvatarEditor}>
                            <img
                              src={
                                data.me.data.profile.image
                                  ? process.env.AWS_S3_ENDPOINT + data.me.data.profile.image
                                  : "/static/profile_images/dummy.png"
                              }
                              className="profile-image img-fluid img-thumbnail rounded-circle"
                              alt="avatar img"
                            />
                            <div className="profile-image-overlay rounded-circle">
                              <div className="profile-image-overlay-text">Edit</div>
                            </div>
                          </div>
                        );
                      }}
                    </Query>
                  </div>
                  <div className="m-3 text-center">{profile_name}</div>
                  <div className="text-center">
                    <span>Tellers | Readers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-panel col-12 col-sm-8 col-md-9">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Profile</h5>
                  <div className="form-group m-2">
                    <label htmlFor="profile_name">Nickname</label>
                    <input
                      type="text"
                      id="profile_name"
                      name="profile_name"
                      className="form-control"
                      value={profile_name}
                      onChange={this.props._handleChange}
                    />
                  </div>
                  <div className="form-group m-2">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="form-control"
                      value={company}
                      onChange={this.props._handleChange}
                    />
                  </div>
                  <div className="form-group m-2">
                    <label htmlFor="job_boolean">Job</label>
                    <select
                      name="job_boolean"
                      id="job_boolean"
                      className="form-control"
                      value={job_boolean}
                      onChange={this.props._handleChange}
                    >
                      <option value="0">(I don't want)</option>
                      <option value="1">Liner</option>
                      <option value="2">Forwarder</option>
                      <option value="3">etc</option>
                    </select>
                  </div>
                  <Mutation
                    mutation={UPDATE_PROFILE}
                    variables={this.props.profile}
                    onCompleted={({ updateProfile }) => {
                      if (updateProfile.ok) {
                        notify("Successfully Saved!", "success");
                      } else {
                        notify(`Error ${updateProfile.error}`, "error");
                      }
                    }}
                  >
                    {updateProfile => (
                      <button className="btn btn-primary m-2" onClick={updateProfile}>
                        SAVE
                      </button>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .profile-image {
              opacity: 1;
              display: block;
              transition: 0.5s ease;
              backface-visibility: hidden;
            }
            .profile-image-overlay {
              transition: 0.5s ease;
              opacity: 0;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              text-align: center;
            }
            .container-profile-image:hover .profile-image {
              opacity: 0.5;
              cursor: pointer;
            }
            .container-profile-image:hover .profile-image-overlay {
              opacity: 1;
              cursor: pointer;
            }
            .profile-image-overlay-text {
              color: white;
            }
          `}
        </style>
      </div>
    );
  }
}

export default withApollo(Profile);
