import httpService from "../../services/httpService";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import AccessDenied from "../../components/access-denied";
import { toast } from "react-toastify";
import PaymentsList from "../../components/PaymentsList";
import getEncodedJWT from "../../services/getEncodedJWT";
import urls from "../../urls";

const apiEndpoint = urls.api.paymentsDjango;
// e.g., "https://local.awesound.com:8000/api/next/payments-with-auth-test"

export default function Page() {
  const [session, loading] = useSession();
  const [payments, setPayments] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fromDotEnv = process.env.TEST_ENV_VALUE;
    console.log("fromDotEnv is ", fromDotEnv);
    const fetchPayments = async () => {
      // const res = await fetch(apiEndpoint);
      // const json = await res.json();

      // updateToken(); // sets headers
      const superToken = await getEncodedJWT();
      console.log("use apiEndpoint ", apiEndpoint);
      const response = await httpService.get(apiEndpoint, {
        headers: { JWTCHECK: superToken },
      });
      // const response = await httpService.get(apiEndpoint, { headers: goodHeaders, });
      const json = await response.data;
      console.log("json is ", json);
      if (json.payments_list) {
        toast.success(json.result);
        setPayments(json);
      } else if (json.result) {
        toast.error("Unexpected response from API endpoint");
        toast.error(json.result);
        // setPayments("No payments found");
      }
    };
    if (!payments) fetchPayments();
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        Soz, babez....
        <br />
        <AccessDenied />
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Payments</h1>
      <h2>
        Custom header is added in this page, not depending on axios.defaults.
        Note: If we depend on axios.defaults (in httpService), it'll work if we
        navigate away from this page and come back, but it won't work on the
        first page load
      </h2>
      <p>
        You're signed in! (This page is private, you must be signed in to access
        it.)
      </p>
      {payments && <PaymentsList payments={payments.payments_list} />}
    </Layout>
  );
}
