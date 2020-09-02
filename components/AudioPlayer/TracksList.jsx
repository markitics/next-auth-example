import React from "react";
import AudioNotFound from "./music.svg";

const TrackList = ({
  items,
  howlerPlaying,
  howlerPlay,
  howlerPause,
  activeUrl,
  firstMusicPlay,
  highLightedUrl,
  toHighlightUrl,
  toMinutes,
  width,
}) => {
  return (
    <React.Fragment>
      {items.map((el, i) => (
        <div
          onMouseEnter={() => toHighlightUrl(el.stream_url)}
          onMouseLeave={width < 450 ? null : () => toHighlightUrl(null)}
          onClick={
            howlerPlaying &&
            activeUrl ===
              el.stream_url + "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7"
              ? howlerPause
              : () =>
                  howlerPlay(
                    el.stream_url,
                    i,
                    el.artwork_url && el.artwork_url.replace(/large/gi, "crop"),
                    el.title
                  )
          }
          className="audio-tracks-list-el"
          key={el.id}
          style={
            firstMusicPlay &&
            activeUrl ===
              el.stream_url + "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7"
              ? { background: "rgb(219, 222, 222, 0.55)" }
              : {}
          }
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {(highLightedUrl === el.stream_url ||
              (activeUrl ===
                el.stream_url + "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7" &&
                firstMusicPlay)) &&
              (howlerPlaying &&
              activeUrl ===
                el.stream_url +
                  "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7" ? (
                <i
                  className="fas fa-pause-circle play-pause-controls list-audio-controls"
                  onClick={howlerPause}
                />
              ) : (
                <i
                  className="fas fa-play-circle play-pause-controls list-audio-controls"
                  onClick={() =>
                    howlerPlay(el.stream_url, i, el.artwork_url, el.title)
                  }
                />
              ))}
            <div
              className={
                highLightedUrl === el.stream_url ||
                (activeUrl ===
                  el.stream_url +
                    "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7" &&
                  firstMusicPlay)
                  ? "audio-tracks-list-el-img-darken"
                  : null
              }
            />
            <img
              src={el.artwork_url || AudioNotFound}
              className="audio-tracks-list-el-img"
              alt="audio-tracks-img"
              style={{ backgroundImage: `url(${AudioNotFound})` }}
            />

            <h5 style={{ marginRight: "15px", textAlign: "left" }}>
              {el.title}
            </h5>
          </div>
          <h5 style={{ color: "black", fontWeight: "bold" }}>
            {toMinutes(el.duration / 1000)}
          </h5>
        </div>
      ))}
    </React.Fragment>
  );
};

export default TrackList;
