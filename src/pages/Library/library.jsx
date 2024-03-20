import React, { useState, useEffect } from "react";
import apiClient from "../../spotify";
import "./library.css";

export default function Library() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("/me/playlists").then(function (response) {
      setPlaylists(response.data.items);
      console.log(response.data.items);
    });
  }, []);

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div className="playlist-card">{playlist.name}</div>
        ))}
      </div>
    </div>
  );
}
