import React from "react";
import { Slider } from "antd";

const AudioVolume = ({
  setVolume,
  volume,
  mobileAudioPlayerOpen,
  muteVolume,
  volumeOff,
  width,
}) => {
  return (
    <div
      className="volume audio-vol"
      style={
        mobileAudioPlayerOpen || width > 600
          ? { display: "flex" }
          : { display: "none" }
      }
    >
      {width > 600 && volume !== 0 ? (
        <i class="fas fa-volume-up play-pause-controls" onClick={muteVolume} />
      ) : (
        <i class="fas fa-volume-off play-pause-controls" onClick={muteVolume} />
      )}
      {width > 700 ? (
        <div className="vol-container">
          <Slider
            className="volume"
            step={0.001}
            tipFormatter={null}
            onChange={setVolume}
            value={volume}
            min={0}
            max={1}
            maxValue={1}
            vertical={width > 700 ? true : false}
          />
        </div>
      ) : (
        <Slider
          className="volume"
          step={0.001}
          tipFormatter={null}
          onChange={setVolume}
          value={volume}
          min={0}
          max={1}
          maxValue={1}
          vertical={width > 700 ? true : false}
        />
      )}

      {width > 600 ? null : <i class="fas fa-volume-up play-pause-controls" />}
    </div>
  );
};

export default AudioVolume;
