import { Provider as NextAuthProvider } from "next-auth/client";
import { ToastContainer } from "react-toastify";
import Header from "../components/header";
// import "reflect-metadata"; // for using TypeORM, see https://www.npmjs.com/package/typeorm#installation
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "./styles.css";
// const pg = require("pg");
import PlayerContext from "../context/playerContext";
// import GlobalContext from "../context/globalContext";

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.

export default function App({ Component, pageProps }) {
  const url = "https://www.youtube.com/watch?v=ysz5S6PUM-U";
  // const url = "https://awesound.com/t/5d1d177b90.mp3"; // private
  // url =
  // "https://cdn2.awesound.com/uploads/aman999arora/puid-50trainee/5d1d177b900ade912f038f7069e04282/50-trainees---GPST1-2-Introduction.MP3";
  // public
  const imageUrl =
    "https://cdn2.awesound.com/images/aman999arora/2019/489da710-ee0f-43f9-bb86-1edae23da4bd/image1.png";

  const playerState = {
    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    pip: true,
    playing: true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  };

  return (
    <PlayerContext.Provider
      value={{ playerState: playerState, url: playerState.url }}
    >
      <NextAuthProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        options={{
          // Client Max Age controls how often the useSession in the client should
          // contact the server to sync the session state. Value in seconds.
          // e.g.
          // * 0  - Disabled (always use cache value)
          // * 60 - Sync session state with server if it's older than 60 seconds
          clientMaxAge: 0,
          // Keep Alive tells windows / tabs that are signed in to keep sending
          // a keep alive request (which extends the current session expiry) to
          // prevent sessions in open windows from expiring. Value in seconds.
          //
          // Note: If a session has expired when keep alive is triggered, all open
          // windows / tabs will be updated to reflect the user is signed out.
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <ToastContainer autoClose={7000} />
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </PlayerContext.Provider>
  );
}
