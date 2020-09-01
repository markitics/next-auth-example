import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_APP_DOMAIN + "/api/examples/protected"
      );
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

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
      <h1>Private Page</h1>
      <p>
        You're signed in! (This page is private, you must be signed in to access
        it.)
      </p>
      <p>
        <strong>{content}</strong>
      </p>
    </Layout>
  );
}
