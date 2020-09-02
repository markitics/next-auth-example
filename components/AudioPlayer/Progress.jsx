import React from "react";
import { Slider } from "antd";

const Progress = ({
  progress,
  onSeekChange,
  howlerLoad,
  played,
  toMinutes,
  duration,
  mobileAudioPlayerOpen,
  width,
}) => {
  return (
    <div className="audio-progress">
      <div style={{ display: "flex", alignItems: "center" }}>
        {mobileAudioPlayerOpen || width > 600 ? (
          played && !isNaN(played) ? (
            <div className="audio-player-time audioTime-left">
              {toMinutes(played)}{" "}
            </div>
          ) : (
            <div className="audio-player-time audioTime-left">0:00</div>
          )
        ) : null}
        <Slider
          disabled={isNaN(progress) || !howlerLoad}
          step={0.001}
          tipFormatter={null}
          onChange={onSeekChange}
          value={progress ? progress : null}
          min={0}
          max={1}
          maxValue={1}
          style={{ width: "100%" }}
        />
        {mobileAudioPlayerOpen || width > 600 ? (
          duration && !isNaN(duration) ? (
            <div className="audio-player-time audioTime-right">
              {toMinutes(duration)}{" "}
            </div>
          ) : (
            <div className="audio-player-time audioTime-right">0:00</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Progress;
