import { Mutation, withApollo } from "react-apollo";
import { SIGNUP } from "./signupQueries";
import cookie from "cookie";
import { SET_ISLOGIN } from "../../lib/client";
import { __APOLLO_CLIENT__ } from "../../lib/initApollo";
import redirect from "../../lib/redirect";

const signup = ({ client }) => {
  let email: HTMLInputElement | null,
    password: HTMLInputElement | null,
    passwordConfirm: HTMLInputElement | null,
    nickname: HTMLInputElement | null;
  return (
    <div>
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

            client.cache.reset().then(() =>
              client
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
            console.log(data.signup.error);
          }
        }}
        onError={error => console.log(error)}
      >
        {(signup, { data }) => (
          <>
            <form
              onSubmit={event => {
                event.preventDefault();
                event.stopPropagation();

                signup({
                  variables: {
                    email: email ? email.value : "",
                    password: password ? password.value : "",
                    nickname: nickname ? nickname.value : ""
                  }
                });

                if (email) {
                  email.value = "";
                }
                if (password) {
                  password.value = "";
                }
                if (passwordConfirm) {
                  passwordConfirm.value = "";
                }
                if (nickname) {
                  nickname.value = "";
                }
              }}
            >
              {data && !data.signup.ok && <p>필요한 정보가 부족합니다.</p>}
              <input
                type="text"
                name="email"
                ref={node => (email = node)}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                ref={node => (password = node)}
                placeholder="비밀번호"
              />
              <input
                type="passwordConfirm"
                name="passwordConfirm"
                ref={node => (passwordConfirm = node)}
                placeholder="비밀번호 확인"
              />
              <input
                type="text"
                name="nickname"
                ref={node => (nickname = node)}
                placeholder="닉네임"
              />
              <button>회원가입</button>
            </form>
          </>
        )}
      </Mutation>
    </div>
  );
};

export default withApollo(signup);
