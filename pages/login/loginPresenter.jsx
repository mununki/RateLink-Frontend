import { Mutation, withApollo } from "react-apollo";
import React from "react";
import cookie from "cookie";
import Link from "next/link";
import { LOGIN } from "./loginQueries";
import { SET_ISLOGIN } from "../../lib/client";
import { __APOLLO_CLIENT__ } from "../../lib/initApollo";
import redirect from "../../lib/redirect";
import { notify } from "../../utils/notify";
import { FIND_USERS } from "../friends/friendsQueries";

const saveEmailToLocalStorage = email => {
  localStorage.setItem("email@ratelink", email);
};

const getEmailFromLocalStorage = () => {
  const email = localStorage.getItem("email@ratelink");
  return email;
};

const removeEmailFromLocalStorage = () => {
  localStorage.removeItem("email@ratelink");
};

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    rememberEmail: false
  };

  async componentDidMount() {
    const email = await getEmailFromLocalStorage();
    if (email) {
      this.setState({ email, rememberEmail: true });
    }
  }

  componentWillUnmount() {
    if (this.state.rememberEmail) {
      saveEmailToLocalStorage(this.state.email);
    } else {
      removeEmailFromLocalStorage();
    }
  }

  _handleChange = e => {
    const { email, password, rememberEmail } = this.state;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value
    });
  };

  render() {
    const { email, password, rememberEmail } = this.state;
    return (
      <div className="height-full-align-middle">
        <div className="container">
          <Mutation
            mutation={LOGIN}
            onCompleted={data => {
              if (data.login.ok) {
                document.cookie = cookie.serialize("token", data.login.data.token, {
                  maxAge: 30 * 24 * 60 * 60 // 30 days
                });

                this.props.client.cache.reset().then(() =>
                  this.props.client
                    .mutate({
                      mutation: SET_ISLOGIN,
                      variables: { isLogin: true }
                    })
                    .then(() => {
                      window[__APOLLO_CLIENT__] = null;
                      window.location.href = "/rates";
                    })
                );
              } else {
                notify("Email, 비밀번호를 확인하세요", "error");
              }
            }}
            onError={error => notify("Email, 비밀번호를 확인하세요", "error")}
          >
            {login => (
              <div className="form-group d-flex justify-content-center">
                <div className="col-sm-5">
                  <div className="m-4 text-center">
                    <h3>로그인</h3>
                  </div>
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      event.stopPropagation();

                      login({
                        variables: {
                          email,
                          password
                        }
                      });
                    }}
                  >
                    <input
                      type="text"
                      name="email"
                      className="form-control m-2"
                      value={email}
                      onChange={this._handleChange}
                      placeholder="E-mail"
                    />
                    <input
                      type="password"
                      name="password"
                      className="form-control m-2"
                      value={password}
                      onChange={this._handleChange}
                      placeholder="Password"
                    />
                    <div className="form-group form-check m-2">
                      <input
                        type="checkbox"
                        name="rememberEmail"
                        id="remember-email"
                        className="form-check-input"
                        checked={this.state.rememberEmail}
                        onChange={this._handleChange}
                      />
                      <label className="form-check-label" htmlFor="remember-email">
                        Email 기억
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">
                      로그인
                    </button>
                  </form>
                  <div className="m-2 text-center">
                    <Link href="/signup">
                      <a>회원가입</a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default withApollo(Login);
