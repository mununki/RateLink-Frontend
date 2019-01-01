import cookie from "js-cookie";

export const setToken = (token: string) => {
  cookie.set("token", token, { expires: 30 });
};

export const removeToken = () => {
  cookie.remove("token");
};
