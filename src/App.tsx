import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./constants";
import { AllMovies } from "./pages/AllMovies";
import { AppHome } from "./pages/AppHome";
import { MovieCreate } from "./pages/MovieCreate";
import { MovieDelete } from "./pages/MovieDelete";
import { MovieDetails } from "./pages/MovieDetails";
import { MovieEdit } from "./pages/MovieEdit";

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/movies/add" element={<MovieCreate />} />
          <Route path="/movies/:movieId/details" element={<MovieDetails />} />
          <Route path="/movies/:movieId/edit" element={<MovieEdit />}></Route>
          <Route path="/movies/:movieId/delete" element={<MovieDelete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
