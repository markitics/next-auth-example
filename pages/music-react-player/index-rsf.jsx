import React, { useContext, useState, useRef } from "react";
import ReactPlayer from "react-player";
import Duration from "../../components/ReactPlayer/Duration";
import "./app.module.css";
import "./range.module.css";
// import "./defaults.module.css";
// import "./reset.module.css";
import { version } from "../../package.json";
import PlayerContext from "../../context/playerContext";

function MusicPage(props) {
  const playerContext = useContext(PlayerContext);

  const playerRef = React.createRef();
  //   const playerRef = useRef();

  // Constants that won't change:
  const pip = true;
  const muted = false;
  const light = false;
  const controls = true;

  // These might change, so use 'useState'
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [url, setUrl] = useState(
    "https://cdn2.awesound.com/uploads/aman999arora/puid-50trainee/5d1d177b900ade912f038f7069e04282/50-trainees---GPST1-2-Introduction.MP3"
  );
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playbackRateChanging, setPlaybackRateChanging] = useState(false);
  const [volume, setVolume] = useState(1.0);

  // UI elements
  const urlInput = useRef(null);

  const defaultState = {
    // These won't change: use const
    // pip: true,
    // volume: 0.8,
    // muted: false,
    // loop: false,
    // light: false,
    // controls: true,
    // These can change: use useState
    // url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    // playing: true,
    // played: 0,
    // loaded: 0,
    // duration: 0,
    // playbackRate: 1.0,
  };

  // const playerState = useState(defaultState);

  // const url = "https://www.youtube.com/watch?v=ysz5S6PUM-U";
  // const url = "https://awesound.com/t/5d1d177b90.mp3"; // private
  // url =
  // "https://cdn2.awesound.com/uploads/aman999arora/puid-50trainee/5d1d177b900ade912f038f7069e04282/50-trainees---GPST1-2-Introduction.MP3";
  // public
  const imageUrl =
    "https://cdn2.awesound.com/images/aman999arora/2019/489da710-ee0f-43f9-bb86-1edae23da4bd/image1.png";

  const load = (url) => {
    setUrl(url);
    setPlayed(0);
    setLoaded(0);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleToggleLoop = () => {
    setLoop(!loop);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlay = () => {
    console.log("onPlay, yes let it play");
    setPlaying(true);
  };

  const handlePause = () => {
    console.log("onPause");
    setPlaying(false);
  };

  //   const handePlaybackRateMouseDown = (e) => {
  //     setPlaybackRateChanging(true);
  //   };
  //   const handePlaybackRateMouseUp = (e) => {
  //     setPlaybackRateChanging(false);
  //   };

  const handleSetPlaybackRate = (e) => {
    console.log("Adjust the playbackRate");
    setPlaybackRate(parseFloat(e.target.value));
  };

  const handleIncrementPlaybackRate = (delta = 0.1) => {
    console.log("Increment the playbackRate");
    const newRate = parseFloat(playbackRate + parseFloat(delta)).toFixed(1);
    console.log("newRate is ", newRate);
    setPlaybackRate(parseFloat(newRate));
  };

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleJumpForward = (numSecs) => {
    const playedSeconds = played * duration;
    const dest = Math.max(0, Math.min(duration - 5, numSecs + playedSeconds));
    console.log("Jump to ", dest);
    console.log("played is ", played);
    console.log("playedSeconds is ", playedSeconds);
    playerRef.current.seekTo(dest);
    const playedFraction = dest / duration;
    setPlayed(playedFraction);
    // Note: we explicitly set played so that we can tap +/- 15s many times in quick succession,
    // without waiting for the audio to load at each point.
  };

  const handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      //   this.setState(state);
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    setPlaying(loop);
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    setDuration(duration);
  };

  const renderLoadButton = (url, label) => {
    return <button onClick={() => load(url)}>{label}</button>;
  };

  // navigator.mediaSession.metadata = new MediaMetadata({
  //   title: "Fun track, yo!",
  //   artist: "Aman Arora",
  //   album: "Medical Audio",
  //   artwork: [
  //     {
  //       src: imageUrl,
  //       // sizes: '100x100', // HeightxWidth
  //       type: "image/png",
  //     },
  //   ],
  // });

  const SEPARATOR = " · ";

  return (
    <div className="app">
      <section className="section">
        <h1>ReactPlayer Demo</h1>
        <div className="player-wrapper">
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onPlay={handlePlay}
            onPause={handlePause}
            onBuffer={() => console.log("onBuffer")}
            onSeek={(e) => console.log("onSeek", e)}
            onEnded={handleEnded}
            onError={(e) => console.log("onError", e)}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </div>

        <table>
          <tbody>
            <tr>
              <th>Start/Stope</th>
              <td>
                <button onClick={handlePlayPause}>
                  {playing ? "Pause" : "Play"}
                </button>
              </td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>
                <button onClick={() => handleIncrementPlaybackRate(-0.1)}>
                  Slower
                </button>
                <button onClick={handleSetPlaybackRate} value={1}>
                  1x
                </button>
                <button onClick={() => handleIncrementPlaybackRate(0.1)}>
                  Faster
                </button>
                <input
                  className="range"
                  type="range"
                  min={0}
                  max={2.999999}
                  step="0.1"
                  value={playbackRate}
                  //   onMouseDown={handePlaybackRateMouseDown}
                  onChange={handleSetPlaybackRate}
                  //   onMouseUp={handePlaybackRateMouseUp}
                />
                {playbackRate}
              </td>
            </tr>
            <tr>
              <th>Jump around</th>
              <td>
                <button onClick={() => playerRef.current.seekTo(10)}>
                  Seek to 00:10
                </button>
                <button onClick={() => playerRef.current.seekTo(55)}>
                  Seek to 00:55
                </button>
                <button onClick={() => handleJumpForward(-15)}>Jump -15</button>{" "}
                <button onClick={() => handleJumpForward(30)}>Jump +30</button>
              </td>
            </tr>
            <tr>
              <th>Seek</th>
              <td>
                <input
                  className="range"
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Played</th>
              <td>
                <progress max={1} value={played} />
              </td>
            </tr>
            <tr>
              <th>Loaded</th>
              <td>
                <progress max={1} value={loaded} />
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>
                <input
                  className="range"
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="loop">Loop</label>
              </th>
              <td>
                <input
                  id="loop"
                  type="checkbox"
                  checked={loop}
                  onChange={handleToggleLoop}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="section">
        <table>
          <tbody>
            <tr>
              <th>YouTube</th>
              <td>
                {renderLoadButton(
                  "https://www.youtube.com/watch?v=oUFJJNQGwhk",
                  "Test A"
                )}
                {renderLoadButton(
                  "https://www.youtube.com/watch?v=jNgP6d9HraI",
                  "Test B"
                )}
                {renderLoadButton(
                  "https://www.youtube.com/playlist?list=PLogRWNZ498ETeQNYrOlqikEML3bKJcdcx",
                  "Playlist"
                )}
              </td>
            </tr>
            <tr>
              <th>SoundCloud</th>
              <td>
                {renderLoadButton(
                  "https://soundcloud.com/miami-nights-1984/accelerated",
                  "Test A"
                )}
                {renderLoadButton(
                  "https://soundcloud.com/tycho/tycho-awake",
                  "Test B"
                )}
              </td>
            </tr>

            <tr>
              <th>Vimeo</th>
              <td>
                {renderLoadButton("https://vimeo.com/90509568", "Test A")}
                {renderLoadButton("https://vimeo.com/169599296", "Test B")}
              </td>
            </tr>

            <tr>
              <th>Files</th>
              <td>
                {renderLoadButton(
                  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
                  "mp4"
                )}
                {renderLoadButton(
                  "https://test-videos.co.uk/vids/bigbuckbunny/webm/vp8/360/Big_Buck_Bunny_360_10s_1MB.webm",
                  "webm"
                )}
                {renderLoadButton(
                  "https://filesamples.com/samples/video/ogv/sample_640x360.ogv",
                  "ogv"
                )}
                {renderLoadButton(
                  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
                  "mp3"
                )}
                <br />
                {renderLoadButton(
                  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
                  "HLS (m3u8)"
                )}
                {renderLoadButton(
                  "http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd",
                  "DASH (mpd)"
                )}
              </td>
            </tr>
            <tr>
              <th>Custom URL</th>
              <td>
                <input ref={urlInput} type="text" placeholder="Enter URL" />
                <button onClick={() => setUrl(urlInput.value)}>Load</button>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>State</h2>

        <table>
          <tbody>
            <tr>
              <th>url</th>
              <td className={!url ? "faded" : ""}>
                {(url instanceof Array ? "Multiple" : url) || "null"}
              </td>
            </tr>
            <tr>
              <th>playing</th>
              <td>{playing ? "true" : "false"}</td>
            </tr>
            <tr>
              <th>volume</th>
              <td>{volume.toFixed(3)}</td>
            </tr>
            <tr>
              <th>played</th>
              <td>{played.toFixed(3)}</td>
            </tr>
            <tr>
              <th>loaded</th>
              <td>{loaded && loaded.toFixed(3)}</td>
            </tr>
            <tr>
              <th>duration</th>
              <td>
                <Duration seconds={duration} />
              </td>
            </tr>
            <tr>
              <th>elapsed</th>
              <td>
                <Duration seconds={duration * played} />
              </td>
            </tr>
            <tr>
              <th>remaining</th>
              <td>
                <Duration seconds={duration * (1 - played)} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default MusicPage;
