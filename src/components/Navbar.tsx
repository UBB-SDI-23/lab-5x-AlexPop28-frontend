import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const user = localStorage.getItem("user");

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            color="inherit"
            aria-label="movie"
            sx={{ mr: 2 }}
          >
            <MovieIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 5 }}>
            Movie Database
          </Typography>
          <Button
            variant={path.startsWith("/movies") ? "outlined" : "text"}
            to="/movies"
            component={Link}
            color="inherit"
            sx={{ mr: 5 }}
            startIcon={<LocalMoviesIcon />}
          >
            Movies
          </Button>
          <Button
            variant={path.startsWith("/actors") ? "outlined" : "text"}
            to="/actors"
            component={Link}
            color="inherit"
            sx={{ mr: 5 }}
            startIcon={<PersonIcon />}
          >
            Actors
          </Button>
          <Button
            variant={path.startsWith("/directors") ? "outlined" : "text"}
            to="/directors"
            component={Link}
            color="inherit"
            sx={{ mr: 5 }}
            startIcon={<PersonIcon />}
          >
            Directors
          </Button>
          <Box display="flex" flexGrow={1} justifyContent="flex-end">
            {!user && (
              <>
                <Button
                  variant={path.startsWith("/login") ? "outlined" : "text"}
                  to="/login"
                  component={Link}
                  color="inherit"
                  sx={{ mr: 5 }}
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button
                  variant={path.startsWith("/register") ? "outlined" : "text"}
                  to="/register"
                  component={Link}
                  color="inherit"
                  sx={{ mr: 5 }}
                >
                  Register
                </Button>
              </>
            )}
            {user && (
              <>
                <Button
                  variant={path.startsWith("/users") ? "outlined" : "text"}
                  to={`/users/${JSON.parse(user).username}`}
                  component={Link}
                  color="inherit"
                  sx={{ mr: 5 }}
                >
                  {JSON.parse(user).username}
                </Button>
                <Button
                  variant={path.startsWith("/logout") ? "outlined" : "text"}
                  to="/logout"
                  component={Link}
                  color="inherit"
                  sx={{ mr: 5 }}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
