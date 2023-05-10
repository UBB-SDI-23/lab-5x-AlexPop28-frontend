import { ConfirmProvider } from "material-ui-confirm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navbar } from "./components/Navbar";
import "./constants";
import { AppHome } from "./pages/AppHome";
import { ActorCreate } from "./pages/actors/ActorCreate";
import { ActorEdit } from "./pages/actors/ActorEdit";
import { ActorsByTotalIncome } from "./pages/actors/ActorsByTotalIncome";
import { AllActors } from "./pages/actors/AllActors";
import { AdminPage } from "./pages/admin/AdminPage";
import { Activate } from "./pages/auth/Activate";
import { Login } from "./pages/auth/Login";
import { Logout } from "./pages/auth/Logout";
import { Register } from "./pages/auth/Register";
import { AllDirectors } from "./pages/directors/AllDirectors";
import { DirectorCreate } from "./pages/directors/DirectorCreate";
import { DirectorEdit } from "./pages/directors/DirectorEdit";
import { DirectorsByLastMovie } from "./pages/directors/DirectorsByLastMovie";
import { AllMovies } from "./pages/movies/AllMovies";
import { MovieCreate } from "./pages/movies/MovieCreate";
import { MovieEdit } from "./pages/movies/MovieEdit";
import { AddMovieActor } from "./pages/movies/actors/AddMovieActor";
import { AllMovieActors } from "./pages/movies/actors/AllMovieActors";
import { AllUsers } from "./pages/users/AllUsers";
import { UserDetails } from "./pages/users/UserDetails";

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
          <Route
            path="/actors/by_total_income"
            element={<ActorsByTotalIncome />}
          />
          <Route path="/directors" element={<AllDirectors />} />
          <Route path="/directors/add" element={<DirectorCreate />} />
          <Route path="/directors/:directorId" element={<DirectorEdit />} />
          <Route
            path="/directors/by_last_release_date"
            element={<DirectorsByLastMovie />}
          />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:username" element={<UserDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate/:activationCode" element={<Activate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ConfirmProvider>
  );
};
