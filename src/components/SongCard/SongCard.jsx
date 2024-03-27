import React from "react";
import "./songCard.css";
import AlbumImage from "./AlbumImage/AlbumImage";
import AlbumInfo from "./AlbumInfo/AlbumInfo";

export default function SongCard({ album }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}
