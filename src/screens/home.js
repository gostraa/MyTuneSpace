import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./library";
import Feed from "./feed";
import Trending from "./trending";
import Player from "./player";
import Favorite from "./favorite";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/player" element={<Player />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </Router>
  );
}
