import { AppHome } from "./components/AppHome";
import { AllMovies } from "./components/AllMovies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./constants";

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/movies" element={<AllMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
