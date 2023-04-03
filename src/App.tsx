import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AllMovies } from "./components/AllMovies";
import { AppHome } from "./components/AppHome";
import { MovieDetails } from "./components/MovieDetails";
import "./constants";

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/movies/:movieId/details" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
