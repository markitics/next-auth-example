// This is an example of to protect an API route
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({ content: "Great, you're now reading protected content." });
  } else {
    res.send({ error: "Access denied" });
  }
};
