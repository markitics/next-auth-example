// Motivation for this file:
// Provide a simple way of getting next-auth.session-token cookie,
// client-side, before sending it to Django.

// Perhaps there's a simpler client-side solution,
// using universal-cookie (npm package) or similar,
// but this work-around will do for now

// https://stackoverflow.com/a/58525941/870121

import urls from "../urls";

const getEncodedJWT = async () => {
  const url = urls.apiGetEncodedJWT;
  const response = await fetch(url).then((res) => res.json());
  console.log("in getEncodedJWT, getting token, response is ", response);
  const token = response.token;
  return token;
};

export default getEncodedJWT;
