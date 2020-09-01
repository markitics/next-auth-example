// return the signed token
export default (req, res) => {
  const tokenToVerify = req.cookies["next-auth.session-token"];
  if (tokenToVerify) {
    return res.json({ token: tokenToVerify });
  }
  return res.json({ token: "" });
};
