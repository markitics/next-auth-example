import httpService from "./httpService";
// import { jwt } from "next-auth/jwt";
import urls from "./urls";

httpService.defaults.headers.common["JWT_HARD_2"] = "extending...";

const updateTokenHeaders = async () => {
  const response = await fetch(urls.apiGetEncodedJWT).then((res) => res.json());
  console.log("in httpService, getting token, response is ", response);
  const token = response.token;
  console.log("Trying again, token is ", token);
  // localStorage.setItem("ourHackyTokenCopy", token);
  httpService.defaults.headers.common["JWT_LIVE"] = token;
  return token;
};
updateTokenHeaders();

// Usage: when importing, write
// import pingDjango from '/services/pingDjango'
// then replace httpService.get(url) with pingDjango.get(url)
export default {
  get: httpService.get,
  post: httpService.post,
  put: httpService.put,
  patch: httpService.patch,
  delete: httpService.delete,
};
