import { AppHome } from "./components/AppHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppHome />} />
      </Routes>
    </BrowserRouter>
  );
};
