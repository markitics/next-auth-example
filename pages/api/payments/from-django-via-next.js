// import httpService from "../../../services/httpService";
import httpService from "../../../services/httpService";
// import { toast } from "react-toastify";

// This is an example of to protect an API route
import { getSession } from "next-auth/client";

const apiDomain = "https://local.awesound.com:8000";
const apiPath = "/api/next/payments-no-auth-test";
const apiURL = apiDomain + apiPath;

const getPaymentsList = async (username) => {
  const data = { username: "mcmmjones", mood: "super" }; // session.user.username
  const result = await httpService.get(apiURL, { params: data });
  // console.log(result);
  result.data.note =
    "This server-side Next serverless function in turn pings the Django api";
  return result.data;
};

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    // const payments = { payments: ["pay1", "pay2"], result: "success" };
    console.log("session is ", session);
    console.log("user is ", session.user.email);
    // session.user.username is not accessible, just name, email, image
    const email = session.user.email; // "plabable";
    const awesoundResult = await getPaymentsList(email);
    // console.log(awesoundResult);
    // const paymentsList = awesoundResult.payments_list;
    // const payments = {
    //   payments: paymentsList,
    //   result: "success",
    // };
    // toast("This is some json");
    res.json(awesoundResult);
  } else {
    res.send({ result: "Access denied" });
  }
};
