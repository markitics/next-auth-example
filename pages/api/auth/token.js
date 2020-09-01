// return the signed token
module.exports = (req, res) => {
  const tokenToVerify = req.cookies["next-auth.session-token"];
  if (tokenToVerify) {
    res.send(tokenToVerify)
  }
  res.send("")
  // res.json({
  //   query: req.query,
  //   cookies: req.cookies,
  //   "process.env.NODE_ENV": process.env.NODE_ENV,
  // });
};
