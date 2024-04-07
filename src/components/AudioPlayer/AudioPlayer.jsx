import React from "react";
import "./AudioPlayer.css";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";

export const AudioPlayer = ({ currentTrack }) => {
  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={75}
          isPlaying={true}
          //   image={currentTrack?.images[0]?.url}
          size={300}
          color="#96312c"
        />
      </div>
      <div className="player-right-body"></div>
    </div>
  );
};
