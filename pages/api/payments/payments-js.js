// This api endpoint queries our database directly, instead of using the Awesound app at all
import { getSession } from "next-auth/client";

const { Pool } = require("pg");
// simpler than Client. With Pool, we don't have to worry about closing the connection
const connectionString = process.env.DJANGO_DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
});

// const liveResults = async () => {
//   const result = await pool.query("SELECT NOW()", (err, res) => {
//     // console.log(err, res);
//     console.log("res is", res.rows);
//     if (err) {
//       console.log(err.stack);
//       throw err;
//     } else {
//       console.log(res.rows[0]);
//       return res.rows;
//       // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//     }
//   });
//   console.log("result, in liveResults, is", result);
//   return result;
//   //   console.log("rows are", result.rows);
//   //   return await result;
// };

// const testQuery = async () => {
//   await client.connect();
//   const res = await client.query("SELECT $1::text as message", [
//     "Hello world!",
//   ]);
//   console.log(res.rows[0].message); // Hello world!
//   await client.end();
// };

const liveResultsTest = async () => {
  // async/await
  const text = "SELECT NOW()";
  const values = [];
  try {
    const res = await pool.query(text, values);
    console.log(res.rows[0]);
    return res.rows;
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack);
    return err;
  }
};

import Playlist from "../../../models/Playlist";

const liveResults = async () => {
  // This uses typeorm to query the Playlists table
  const playlist = await Playlist.findOne({ puid: "msrabundle" });
  console.log("playlist is ", playlist);
  const text = "SELECT NOW()";
  const values = [];
  try {
    const res = await pool.query(text, values);
    console.log(res.rows[0]);
    return res.rows;
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack);
    return err;
  }
};

export default async (req, res) => {
  console.log("in export fn ");
  const session = await getSession({ req });
  const result = await liveResults(); // getPaymentsList(email);
  // const result = await testQuery();
  console.log("result is", result);
  //   console.log("rows are", result.rows);
  const js = { found: result, mood: "determined" };
  res.json(js);
  //   if (session) {
  //     // const payments = { payments: ["pay1", "pay2"], result: "success" };
  //     console.log("session is ", session);
  //     console.log("user is ", session.user.email);
  //     // session.user.username is not accessible, just name, email, image
  //     const email = session.user.email; // "plabable";
  //   } else {
  //     res.send({ result: "Access denied" });
  //   }
};
