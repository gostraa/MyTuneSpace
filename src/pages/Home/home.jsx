import { Routes, Route } from "react-router-dom";
import Library from "../Library/library";
import Feed from "../feed";
import Trending from "../trending";
import Player from "../player";
import Favorite from "../favorite";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Login from "../auth/login";
import { useEffect, useState } from "react";
import { setClientToken } from "../../spotify";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <div className="main-body">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Library />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/player" element={<Player />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="*" element={<h2>not found</h2>} />
      </Routes>
    </div>
  );
}
