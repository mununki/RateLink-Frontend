import { Mutation, withApollo } from "react-apollo";
import { LOGIN } from "./loginQueries";
import cookie from "cookie";
import { SET_ISLOGIN } from "../../lib/client";
import { __APOLLO_CLIENT__ } from "../../lib/initApollo";
import Link from "next/link";
import redirect from "../../lib/redirect";

const login = ({ client }) => {
  let email: HTMLInputElement | null, password: HTMLInputElement | null;
  return (
    <div className="padding-global-top">
      <Mutation
        mutation={LOGIN}
        onCompleted={data => {
          if (data.login.ok) {
            document.cookie = cookie.serialize("token", data.login.data.token, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            });

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
            console.log(data.login.error);
          }
        }}
        onError={error => console.log(error)}
      >
        {(login, { data }) => (
          <>
            <form
              onSubmit={event => {
                event.preventDefault();
                event.stopPropagation();

                login({
                  variables: {
                    email: email ? email.value : "",
                    password: password ? password.value : ""
                  }
                });

                if (email) {
                  email.value = "";
                }
                if (password) {
                  password.value = "";
                }
              }}
            >
              {data && !data.login.ok && <p>비밀번호가 다릅니다.</p>}
              <input type="text" name="email" ref={node => (email = node)} />
              <input
                type="password"
                name="password"
                ref={node => (password = node)}
              />
              <button>Sign in</button>
            </form>
          </>
        )}
      </Mutation>
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    </div>
  );
};

export default withApollo(login);
