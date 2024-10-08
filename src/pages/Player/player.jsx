import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/SongCard/SongCard";
import { AudioPlayer } from "../../components/AudioPlayer/AudioPlayer";
import Queue from "../../components/Queue/Queue";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data.items[0].track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIdx]?.track);
  }, [currentIdx, tracks]);

  return (
    <>
      <div className="screen-container flex specific-wrapper">
        <div className="flex wow">
          <div className="left-player-body ">
            <AudioPlayer
              currentTrack={currentTrack}
              total={tracks}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
            />
          </div>
          <div className="right-player-body">
            <SongCard album={currentTrack?.album} />
          </div>
        </div>

        <Queue tracks={tracks} setCurrentIdx={setCurrentIdx} />
      </div>
    </>
  );
}
