import "./App.css";
import Home from "./screens/home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/MyTuneSpace">
      <Home />
    </BrowserRouter>
  );
}

export default App;
