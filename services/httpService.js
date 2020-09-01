import axios from "axios";
import { toast } from "react-toastify";
import urls from "../urls";

// axios.defaults.withCredentials = true;
// That's required so that axios requests DO send cookies
// Django needs these cookies so we can access request.user in Django
// https://codewithhugo.com/pass-cookies-axios-fetch-requests

// An alternative would be to send info in header:
// axios.defaults.headers.common["x-auth-token"] = cookies.get(jwt_cookie_name);
// axios.defaults.headers.common["mark-mood"] = "great";
// axios.defaults.headers.common["JWT_ENCODED"] = "hard-coded";
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, JWT_CHECK, Access-Control-Allow-Credentials";

const updateTokenHeaders = async () => {
  const response = await fetch(urls.apiGetEncodedJWT).then((res) => res.json());
  console.log("in httpService, getting token, response is ", response);
  const token = response.token;
  // localStorage.setItem("ourHackyTokenCopy", token);
  axios.defaults.headers.common["JWTCHECK"] = token;
  axios.defaults.headers.common["MOOD"] = "Happy"; // See if this is over-ridden in Component
  axios.defaults.headers.common["AXIOSMOOD"] = "Auto";
  return token;
};
updateTokenHeaders();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error occured, client-side.");
    // toast("An unexpected error occured, client-side."); // multi-coloured bar
    // toast.info("An unexpected error occured, client-side.");
    // toast.success("An unexpected error occured, client-side.");
    // toast.warning("An unexpected error occured, client-side.");
  }
  // return Promise.reject(error);
});

// // At request level
// const insecureAgent = new https.Agent({
//   rejectUnauthorized: false,
// });

// Usage: when importing, write
// import httpService from '/services/httpService'
// then replace axios.get(url) with httpService.get(url)
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
