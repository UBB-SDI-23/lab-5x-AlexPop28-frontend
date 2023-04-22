import { ConfirmProvider } from "material-ui-confirm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import "./constants";
import { AppHome } from "./pages/AppHome";
import { ActorCreate } from "./pages/actors/ActorCreate";
import { ActorEdit } from "./pages/actors/ActorEdit";
import { AllActors } from "./pages/actors/AllActors";
import { AllMovies } from "./pages/movies/AllMovies";
import { MovieCreate } from "./pages/movies/MovieCreate";
import { MovieEdit } from "./pages/movies/MovieEdit";

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
          <Route path="/actors" element={<AllActors />} />
          <Route path="/actors/add" element={<ActorCreate />} />
          <Route path="/actors/:actorId" element={<ActorEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfirmProvider>
  );
};
