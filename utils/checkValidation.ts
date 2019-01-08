// Email check
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 최소 6글자 중 최소 각각 한 개의 소문자, 대문자, 숫자, 특수문자
const rePassword = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const checkValidEmail = (email: string): boolean => {
  const result = reEmail.test(email);

  return result;
};

export const checkValidPassword = (password: string): boolean => {
  const result = rePassword.test(password);

  return result;
};
