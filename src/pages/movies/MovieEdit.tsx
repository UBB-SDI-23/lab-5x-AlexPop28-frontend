import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MovieForm } from "../../components/custom/MovieForm";
import useAxios from "../../lib/hooks/useAxios";
import { Director } from "../../models/director";
import { Movie } from "../../models/movie";

export const MovieEdit = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>({
    name: "",
    rating: 0,
    release_date: "",
    length_in_minutes: 0,
    director: 0,
  });
  const [director, setDirector] = useState<Director>();
  const navigate = useNavigate();
  const axios = useAxios();
  const BASE_URL = `/movies/${movieId}`;

  const fetchMovie = async () => {
    setLoading(true);
    const { data: fetchedMovie } = await axios.get(BASE_URL);
    setMovie({ ...fetchedMovie, director: fetchedMovie.director.id });
    setDirector(fetchedMovie.director);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const onSubmit = async () => {
    try {
      const { data } = await axios.put(BASE_URL, movie);
      navigate(`${BASE_URL}/details`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h1">Edit Movie</Typography>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`${BASE_URL}/details`}
          >
            <ArrowBackIcon />
          </IconButton>
          {loading && <CircularProgress />}
          {!loading && movie && (
            <MovieForm
              movie={movie}
              setMovie={setMovie}
              defaultDirector={director}
            >
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Save
              </Button>
            </MovieForm>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
