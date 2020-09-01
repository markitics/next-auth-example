import React from "react";
import { csrfToken } from "next-auth/client";

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/callback/awesound-django">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username or email
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
