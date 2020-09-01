// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/client";
// import Layout from "../components/layout";
// import AccessDenied from "../components/access-denied";
// import { toast } from "react-toastify";
// import PaymentsList from "../components/PaymentsList/index";
// import getPayments from "../services/db/paymentLookup";

// export default function Page() {
//   const [session, loading] = useSession();
//   const [payments, setPayments] = useState();

//   // Fetch content from protected route
//   useEffect(() => {
//     const fetchPayments = async () => {
//       const res = [
//         "ok",
//         "Don't use sequelize in any client code, hence don't use getPayments()",
//       ]; // await getPayments();
//       setPayments(res);
//       console.log(res);
//     };
//     if (!payments) fetchPayments(12320); // 12320 is plabable
//   }, [session]);

//   // When rendering client side don't display anything until loading is complete
//   if (typeof window !== "undefined" && loading) return null;

//   // If no session exists, display access denied message
//   if (!session) {
//     return (
//       <Layout>
//         Soz, babez....
//         <br />
//         <AccessDenied />
//       </Layout>
//     );
//   }

//   // If session exists, display content
//   return (
//     <Layout>
//       <h1>Payments via serverless next</h1>
//       <p>
//         You're signed in! (This page is private, you must be signed in to access
//         it.)
//       </p>
//       {payments && <PaymentsList payments={payments} />}
//     </Layout>
//   );
// }
