import { Routes, Route } from "react-router-dom";
import Library from "./screens/library";
import Feed from "./screens/feed";
import Trending from "./screens/trending";
import Player from "./screens/player";
import Favorite from "./screens/favorite";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Library />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
      <Route path="/trending" element={<Trending />}></Route>
      <Route path="/player" element={<Player />}></Route>
      <Route path="/favorite" element={<Favorite />}></Route>
      <Route path="*" element={<h2>not found</h2>} />
    </Routes>
  );
}
