// import httpService from "../../../services/httpService";
import httpService from "../../../services/httpService";
// import { toast } from "react-toastify";

// This is an example of to protect an API route
import { getSession } from "next-auth/client";

const apiDomain = "https://local.awesound.com:8000";
const apiPath = "api/next/payments";
const apiURL = apiDomain + apiPath;

// async getPaymentsList() {
//   // Replace that with a live version:
//   const result = await httpService.get(apiURL);
//   console.log(result);
//   return result.data;
// }

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const payments = { payments: ["pay1", "pay2"], result: "success" };
    // const payments = { payments: ["pay1", "pay2"], result: "success" };
    // toast("This is some json");
    res.json(payments);
  } else {
    res.send({ result: "Access denied" });
  }
};
