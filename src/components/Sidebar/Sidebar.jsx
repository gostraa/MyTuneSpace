import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "../SidebarButton/SidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../spotify";

export default function Sidebar() {
  const [avatar, setAvatar] = useState(
    "https://kartinki.pics/uploads/posts/2022-12/1670271778_kartinkin-net-p-kartinki-dlya-profilya-vatsap-krasivo-4.jpg"
  );

  useEffect(() => {
    apiClient.get("me").then((res) => setAvatar(res.data.images[0].url));
  }, []);
  return (
    <div className="sidebar-container">
      <img src={avatar} alt="profile" className="profile-img" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Favorite" to="/favorite" icon={<MdFavorite />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sing Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
}
