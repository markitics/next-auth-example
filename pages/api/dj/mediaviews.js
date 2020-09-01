import axios from "axios";
import httpService from "../../../services/httpService";

export default async (req, res) => {
  //   const trackUid = "trgjw5"; // paid
  const trackUid = "tycmsz"; // free
  const mediaUrl = `https://local.awesound.com:8000/t/${trackUid}.mp3`;
  const freeMp3Url =
    "https://cdn2.awesound.com/media/velocast/2020/d67fb701-5dfe-4a35-a8e4-a59f7232e2ba/ep727.mp3";
  // https://local.awesound.com:8000/t/tycmsz.mp3
  //   const djResponse = await httpService.get(mediaUrl);
  //   const djResponse = await fetch(mediaUrl);

  

  try {
    const response = await axios.get(mediaUrl);
    console.log("response is ", response);
    res.redirect(302, freeMp3Url);
    return response;
  } catch (error) {
    console.log("We met an error", error);
    return error;
    res.status(403);
    res.send("Sorry, we're assuming this is a 403");
  }

//   async function getDjResponse() {}
//   //   let djResponse = null;
//   //   try {
//   //     const djResponse = await axios.get(mediaUrl);
//   //     console.log("djResponse is ", djResponse);
//   //     console.log(djResponse);
//   //   } catch (error) {
//   //     console.log("error is ", error);
//   //     console.error(error);
//   //   }

//   //   const djResponse = getDjResponse();
//   //   console.log("djResponse is ", djResponse);
//   console.log("in api/dj/mediaviews");

//   getDjResponse().then((response) => {
//     res.json({
//       "req-body": req.body,
//       "req-query": req.query,
//       "req-cookies": req.cookies,
//       "dj-response": response,
//       // res: res,
//       notice: "This is using Next native code, no Express",
//     });
//   });

// };
