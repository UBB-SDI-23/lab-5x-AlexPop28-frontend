import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import { Movie } from "../models/movie";

export const AllMovies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/movies`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((fetchedMovies) => {
        setMovies(fetchedMovies);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <h1>All movies</h1>

      {loading && <CircularProgress />}
      {!loading && movies.length === 0 && (
        <Typography variant="h1">No movies found</Typography>
      )}
      {!loading && movies.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Release year</TableCell>
                <TableCell align="right">Length (minutes)</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie, index) => (
                <TableRow key={movie.id}>
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell scope="row">
                    <Link
                      to={`/movies/${movie.id}/details`}
                      title="View movie details"
                    >
                      {movie.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{movie.rating}</TableCell>
                  <TableCell align="right">
                    {movie.release_date.substring(0, 4)}
                  </TableCell>
                  <TableCell align="right">{movie.length_in_minutes}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/movies/${movie.id}/details`}
                    >
                      <Tooltip title="View movie details" arrow>
                        <ReadMoreIcon color="primary" />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/movies/${movie.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/movies/${movie.id}/delete`}
                    >
                      <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
