export default async (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  const mystring = `
  <rss xmlns:atom="http://www.w3.org/2005/Atom"  version="2.0">
  <channel></channel>
  <item>
    <title>mark</title>
  </item>
  </rss>
  `;
  res.send(mystring);
};
