// This is an example of how to return a json response

export default async (req, res) => {
  const myDic = { name: "mark", json: "yes", mood: "high" };
  //   res.send(JSON.stringify(myDic, null, 2))
  res.json(myDic);
};
