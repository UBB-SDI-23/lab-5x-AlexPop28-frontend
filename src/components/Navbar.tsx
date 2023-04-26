import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
