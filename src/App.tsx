import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import "./constants";
import { AppHome } from "./pages/AppHome";
import { AllActors } from "./pages/actors/AllActors";
import { AllMovies } from "./pages/movies/AllMovies";
import { MovieCreate } from "./pages/movies/MovieCreate";
import { MovieDelete } from "./pages/movies/MovieDelete";
import { MovieDetails } from "./pages/movies/MovieDetails";
import { MovieEdit } from "./pages/movies/MovieEdit";

export default () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movies/add" element={<MovieCreate />} />
        <Route path="/movies/:movieId/details" element={<MovieDetails />} />
        <Route path="/movies/:movieId/edit" element={<MovieEdit />}></Route>
        <Route path="/movies/:movieId/delete" element={<MovieDelete />} />
        <Route path="/actors" element={<AllActors />} />
      </Routes>
    </BrowserRouter>
  );
};
