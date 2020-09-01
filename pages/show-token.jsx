import React, { useState, useEffect } from "react";
import getSessionToken from "../services/getSessionToken";
import Cookies from "universal-cookie";
import { getSession } from "next-auth/client";
import urls from "../urls";

function showToken() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const url = urls.apiGetEncodedJWT;
    fetch(url).then((y) => {
      console.log("y is", y);
      setLoading(false);
      setToken("response here bud!");
    });
    console.log("We did get the token, ", token);
    // setToken(myToken);
  }, []);

  const renderTokenSummary = () => {
    console.log("rendering the token summary!");
    if (loading) {
      return <p>Loading...</p>;
    }
    if (!token) {
      return <p>No token, alas!</p>;
    }
    return (
      <p>
        The token is <strong>{token}</strong>{" "}
      </p>
    );
  };

  return (
    <div>
      <h1>We {loading && "might "} have the token</h1>
      {renderTokenSummary()}
    </div>
  );
}

export default showToken;
