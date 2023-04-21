import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "../../components/DeleteButton";
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
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const axios = useAxios();
  const BASE_URL = `/movies/${movieId}/`;

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

  const onSaveChanges = async () => {
    try {
      const { data } = await axios.put(BASE_URL, movie);
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const controlButtons = (
    <>
      {disabled && (
        <IconButton sx={{ mr: 3 }} onClick={() => setDisabled(false)}>
          <Tooltip title="Make changes" arrow>
            <LockIcon />
          </Tooltip>
        </IconButton>
      )}
      {!disabled && (
        <>
          <IconButton sx={{ mr: 3 }} onClick={onSaveChanges}>
            <Tooltip title="Save changes" arrow>
              <LockOpenIcon />
            </Tooltip>
          </IconButton>
          <DeleteButton
            onDelete={async () => {
              await axios.delete(`/movies/${movieId}/`);
              navigate("/movies");
            }}
          />
        </>
      )}
    </>
  );

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h1">
            {disabled ? "About the" : "Edit"} movie
          </Typography>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/movies`}>
            <ArrowBackIcon />
          </IconButton>
          {loading && <CircularProgress />}
          {!loading && movie && (
            <MovieForm
              movie={movie}
              setMovie={setMovie}
              defaultDirector={director}
              disabled={disabled}
            >
              {controlButtons}
            </MovieForm>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
