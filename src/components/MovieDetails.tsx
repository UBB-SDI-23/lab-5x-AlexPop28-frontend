import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import { Movie } from "../models/movie";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/movies/${movieId}`)
      .then((response) => response.json())
      .then((fetchedMovie) => {
        setMovie(fetchedMovie);
        setLoading(false);
      });
  }, [movieId]);

  return (
    <Container>
      {!loading && movie === undefined && <CircularProgress />}
      {!loading && movie !== undefined && (
        <Card sx={{ justifyContent: "flex-start" }}>
          <CardContent>
            <Typography variant="h1">Movie Details</Typography>
            <IconButton component={Link} sx={{ mr: 3 }} to={"/movies"}>
              <ArrowBackIcon />
            </IconButton>{" "}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left" variant="head">
                      Name:
                    </TableCell>
                    <TableCell align="left" variant="head">
                      {movie.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" variant="head">
                      Rating:
                    </TableCell>
                    <TableCell align="left" variant="head">
                      {movie.rating}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" variant="head">
                      Release date:
                    </TableCell>
                    <TableCell align="left" variant="head">
                      {movie.release_date}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" variant="head">
                      Length:
                    </TableCell>
                    <TableCell align="left" variant="head">
                      {movie.length_in_minutes} minutes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" variant="head">
                      Director:
                    </TableCell>
                    <TableCell align="left" variant="head">
                      {movie.director}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" variant="head">
                      Actors:
                    </TableCell>
                    {movie.actors && <TableCell>{movie.actors}</TableCell>}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions sx={{ flexDirection: "row-reverse" }}>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/movies/${movieId}/edit`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/movies/${movieId}/delete`}
            >
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};
