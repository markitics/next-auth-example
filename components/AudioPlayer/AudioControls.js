import React from "react";

const Controls = ({
  howlerPlaying,
  prevSong,
  nextSong,
  howlerPause,
  howlerStart,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
      }}
      className="audio-controls"
    >
      <i
        className="fas fa-backward play-pause-controls"
        style={{ cursor: "pointer" }}
        onClick={prevSong}
        title="Previous"
      />

      {howlerPlaying ? (
        <i
          className="fas fa-pause play-pause-controls"
          onClick={howlerPause}
          title="Pause"
        />
      ) : (
        <i
          className="fas fa-play play-pause-controls"
          onClick={howlerStart}
          title="Play"
        />
      )}
      <i
        className="fas fa-forward play-pause-controls"
        style={{ cursor: "pointer" }}
        onClick={nextSong}
        title="Next"
      />
    </div>
  );
};

export default Controls;
