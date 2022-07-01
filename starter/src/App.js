import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}
export default App;
