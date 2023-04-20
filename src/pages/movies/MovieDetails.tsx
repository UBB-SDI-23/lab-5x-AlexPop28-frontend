import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "../../components/DeleteButton";
import useAxios from "../../lib/hooks/useAxios";
import { Director } from "../../models/director";
import { Movie } from "../../models/movie";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const navigate = useNavigate();
  const axios = useAxios();

  const BACKEND_MOVIE_URL = `/movies/${movieId}/`;

  useEffect(() => {
    setLoading(true);
    const fetchMovie = async () => {
      const { data: fetchedMovie } = await axios.get(BACKEND_MOVIE_URL);
      setMovie(fetchedMovie);
      setLoading(false);
    };
    fetchMovie();
  }, [movieId]);

  return (
    <Container>
      {!loading && movie === undefined && <CircularProgress />}
      {!loading && movie !== undefined && movie.director && (
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
                      {(movie.director as Director).name}
                    </TableCell>
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
            <DeleteButton
              onDelete={async () => {
                await axios.delete(`/movies/${movieId}/`);
                navigate("/movies");
              }}
            />
          </CardActions>
        </Card>
      )}
    </Container>
  );
};