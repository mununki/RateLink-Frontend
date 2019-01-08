import React from "react";
import { Mutation, withApollo } from "react-apollo";
import { SIGNUP, CHECK_IF_EXIST } from "./signupQueries";
import cookie from "cookie";
import { SET_ISLOGIN } from "../../lib/client";
import { __APOLLO_CLIENT__ } from "../../lib/initApollo";
import redirect from "../../lib/redirect";
import { notify } from "../../utils/notify";
import {
  checkValidEmail,
  checkValidPassword
} from "../../utils/checkValidation";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: undefined,
    isEmailValid: null,
    isEmailExist: false,
    isPasswordValid: null
  };

  _handleChangeEmail = async e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const isValid = checkValidEmail(value);
    const {
      data: { checkIfExist }
    } = await this.props.client.query({
      query: CHECK_IF_EXIST,
      variables: {
        email: value
      }
    });
    this.setState({
      email: value,
      isEmailValid: isValid,
      isEmailExist: checkIfExist
    });
  };
  _handleChangePassword = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const isValid = checkValidPassword(e.target.value);
    this.setState({
      [e.target.name]: value,
      isPasswordValid: isValid
    });
  };
  _handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value
    });
  };
  render() {
    const {
      email,
      password,
      passwordConfirm,
      nickname,
      isEmailValid,
      isEmailExist,
      isPasswordValid
    } = this.state;
    return (
      <div className="height-full-align-middle">
        <div className="container">
          <Mutation
            mutation={SIGNUP}
            onCompleted={data => {
              if (data.signup.ok) {
                document.cookie = cookie.serialize(
                  "token",
                  data.signup.data.token,
                  {
                    maxAge: 30 * 24 * 60 * 60 // 30 days
                  }
                );

                this.props.client.cache.reset().then(() =>
                  this.props.client
                    .mutate({
                      mutation: SET_ISLOGIN,
                      variables: { isLogin: true }
                    })
                    .then(() => {
                      window[__APOLLO_CLIENT__] = null;
                      redirect({}, "/");
                    })
                );
              } else {
                notify("이미 가입된 Email 입니다", "error");
              }
            }}
            onError={error => notify("에러가 발생했습니다", "error")}
          >
            {signup => (
              <div className="form-group d-flex justify-content-center">
                <div className="col-sm-5">
                  <div className="m-4 text-center">
                    <h3>회원가입</h3>
                  </div>
                  <form
                    className="needs-validation"
                    noValidate
                    onSubmit={event => {
                      event.preventDefault();
                      event.stopPropagation();

                      if (
                        isEmailValid &&
                        !isEmailExist &&
                        isPasswordValid &&
                        nickname !== undefined &&
                        nickname !== ""
                      ) {
                        signup({
                          variables: {
                            email,
                            password,
                            nickname
                          }
                        });
                      } else {
                        notify("필수 정보를 입력해주세요", "error");
                      }
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        name="email"
                        className={`form-control m-2 ${
                          this.state.email === ""
                            ? null
                            : isEmailValid && !isEmailExist
                            ? "is-valid"
                            : "is-invalid"
                        }`}
                        value={email}
                        onChange={this._handleChangeEmail}
                        placeholder="Email"
                        required
                      />
                      <div className="valid-feedback m-2">가입 가능합니다.</div>
                      {!isEmailValid && (
                        <div className="invalid-feedback m-2">
                          Email 형식이 아닙니다.
                        </div>
                      )}
                      {isEmailExist && (
                        <div className="invalid-feedback m-2">
                          이미 가입된 Email 입니다.
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        className={`form-control m-2 ${
                          this.state.password === ""
                            ? null
                            : this.state.isPasswordValid
                            ? "is-valid"
                            : "is-invalid"
                        }`}
                        value={password}
                        onChange={this._handleChangePassword}
                        placeholder="비밀번호"
                        required
                      />
                      <div className="valid-feedback m-2">Good!</div>
                      <div className="invalid-feedback m-2">
                        최소8자 (영문, 숫자, 특수문자)
                      </div>
                    </div>

                    <div>
                      <input
                        type="password"
                        name="passwordConfirm"
                        className={`form-control m-2 ${
                          this.state.passwordConfirm === ""
                            ? null
                            : this.state.isPasswordValid === true &&
                              this.state.password === this.state.passwordConfirm
                            ? "is-valid"
                            : "is-invalid"
                        }`}
                        value={passwordConfirm}
                        onChange={this._handleChange}
                        placeholder="비밀번호 확인"
                        required
                      />
                      <div className="valid-feedback m-2">일치합니다.</div>
                      <div className="invalid-feedback m-2">
                        일치하지 않습니다.
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="nickname"
                        className={`form-control m-2 ${
                          this.state.nickname === undefined
                            ? null
                            : this.state.nickname !== ""
                            ? "is-valid"
                            : "is-invalid"
                        }`}
                        value={nickname}
                        onChange={this._handleChange}
                        placeholder="이름"
                        required
                      />
                      <div className="valid-feedback m-2">사용가능합니다.</div>
                      <div className="invalid-feedback m-2">
                        필수 입력 사항 입니다.
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary m-2">
                      회원가입
                    </button>
                  </form>
                </div>
              </div>
            )}
          </Mutation>
        </div>
        <style jsx>
          {`
            .height-full-align-middle {
              height: 100vh;
              display: flex;
              align-items: center;
            }
          `}
        </style>
      </div>
    );
  }
}

export default withApollo(Signup);
