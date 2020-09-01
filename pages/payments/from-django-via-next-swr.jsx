// import { useState, useEffect } from "react"; // no, use useSWR here instead
import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import AccessDenied from "../../components/access-denied";
import { toast } from "react-toastify";
import PaymentsList from "../../components/PaymentsList";
import useSWR from "swr";

const apiPath = "/api/payments/from-django-via-next";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const { payments, error } = useSWR(apiPath, fetcher, {
    refreshInterval: 1000,
  });
  const [session, loading] = useSession();

  const renderPaymentsHtml = () => {
    if (error) return <div>failed to load</div>;
    if (!payments) return <div>loading...</div>;
    if (payments && payments.payments_list)
      return <PaymentsList payments={payments.payments_list} />;
    return <div>hello, we got unexpected data</div>;
  };

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
      <p>
        You're signed in! (This page is private, you must be signed in to access
        it.)
      </p>
      {renderPaymentsHtml()}
    </Layout>
  );
}
