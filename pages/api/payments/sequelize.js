import getPayments from "../../../services/db/paymentLookup";

module.exports = async (req, res) => {
  const pays = await getPayments();
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    pays: pays,
    notice: "This is using Next native code, no Express",
  });
};
