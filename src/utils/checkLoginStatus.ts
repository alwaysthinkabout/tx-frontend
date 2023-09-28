import { checkLoginStatusRequest } from "@/services/login";

export const checkLoginStatus = async () => {
  const loginStatusRes = await checkLoginStatusRequest();
  console.log('loginStatusRes',loginStatusRes)
  if (loginStatusRes?.ResponseMetadata?.Code === 0 && loginStatusRes?.Result?.UserID) {
    window.userInfo = loginStatusRes.Result;
  if (loginStatusRes.Result.Status === 'passed') {
      return 'login';
    } else {
      return 'review';
    }
  } else {
    return 'unlogin';
  }
}