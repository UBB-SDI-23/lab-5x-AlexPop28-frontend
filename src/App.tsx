import { ConfirmProvider } from "material-ui-confirm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import "./constants";
import { AppHome } from "./pages/AppHome";
import { ActorCreate } from "./pages/actors/ActorCreate";
import { ActorEdit } from "./pages/actors/ActorEdit";
import { AllActors } from "./pages/actors/AllActors";
import { AllDirectors } from "./pages/directors/AllDirectors";
import { DirectorCreate } from "./pages/directors/DirectorCreate";
import { DirectorEdit } from "./pages/directors/DirectorEdit";
import { DirectorsByLastMovie } from "./pages/directors/DirectorsByLastMovie";
import { AllMovies } from "./pages/movies/AllMovies";
import { MovieCreate } from "./pages/movies/MovieCreate";
import { MovieEdit } from "./pages/movies/MovieEdit";
import { AddMovieActor } from "./pages/movies/actors/AddMovieActor";
import { AllMovieActors } from "./pages/movies/actors/AllMovieActors";

export default () => {
  return (
    <ConfirmProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/movies/add" element={<MovieCreate />} />
          <Route path="/movies/:movieId" element={<MovieEdit />}></Route>
          <Route path="/movies/:movieId/actors" element={<AllMovieActors />} />
          <Route
            path="/movies/:movieId/actors/add"
            element={<AddMovieActor />}
          />
          <Route path="/actors" element={<AllActors />} />
          <Route path="/actors/add" element={<ActorCreate />} />
          <Route path="/actors/:actorId" element={<ActorEdit />}></Route>
          <Route path="/directors" element={<AllDirectors />} />
          <Route path="/directors/add" element={<DirectorCreate />} />
          <Route path="/directors/:directorId" element={<DirectorEdit />} />
          <Route
            path="/directors/by_last_release_date"
            element={<DirectorsByLastMovie />}
          />
        </Routes>
      </BrowserRouter>
    </ConfirmProvider>
  );
};
