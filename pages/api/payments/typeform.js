// // This api endpoint queries our database directly, using TypeORM, not raw 'pg'
// import { getSession } from "next-auth/client";

// import Playlist from "../../../models/Playlist";
// // import { Photo } from "./entity/Photo";

// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { getRepository } from "typeorm/browser";

// // createConnection()
// createConnection({
//   type: "postgres",
// //   host: process.env.DJANGO_DATABASE_HOST,
// //   port: process.env.DJANGO_DATABASE_PORT,
// //   username: process.env.DJANGO_DATABASE_USERNAME,
// //   password: process.env.DJANGO_DATABASE_PASSWORD,
// //   database: process.env.DJANGO_DATABASE_NAME,
//     url: process.env.DJANGO_DATABASE_URL,
//   entities: [Playlist],
//   synchronize: false, // default true,
//   logging: false,
// }).then((connection) => {
//     // here you can start to work with your entities
//     let playlistRepository = connection.getRepository(Playlist);
//     let playlist = await playlistRepository.findOne(
//         { puid: "msrabundle" });
//     console.log("found playlist ", playlist)
//   })
//   .catch((error) => console.log(error));

// // const getPlaylistRepository = () => {
// //   const playlistRepo = getRepository(Playlist);
// //   console.log("got playlistRepo ", playlistRepo);
// //   return playlistRepo;
// // };

// const liveResults = async () => {
//   // This uses typeorm to query the Playlists table
// //   const playlist = await Playlist.findOne({ puid: "msrabundle" });
// //   console.log("playlist is ", playlist);

// };

// export default async (req, res) => {
// //   const playlistRepo = getPlaylistRepository();
//   console.log("in export fn ");
//   const session = await getSession({ req });
// //   const result = await liveResults(); // getPaymentsList(email);
// //   console.log("result is", result);
//   const js = { found: "nothing yet", mood: "determined" };
//   res.json(js);
//   //   if (session) {
//   //     // const payments = { payments: ["pay1", "pay2"], result: "success" };
//   //     console.log("session is ", session);
//   //     console.log("user is ", session.user.email);
//   //     // session.user.username is not accessible, just name, email, image
//   //     const email = session.user.email; // "plabable";
//   //   } else {
//   //     res.send({ result: "Access denied" });
//   //   }
// };
