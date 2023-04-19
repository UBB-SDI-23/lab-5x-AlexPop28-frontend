import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../lib/hooks/useAxios";
import { Director } from "../../models/director";
import { Movie } from "../../models/movie";

const EditForm = ({
  movie,
  setMovie,
  // director,
  setDirector,
  directors,
}: {
  movie: Movie;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  // director: Director;
  setDirector: React.Dispatch<React.SetStateAction<Director | undefined>>;
  directors: Director[];
}) => {
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const BACKEND_URL = `/movies/${movie.id}/`;
    await axios.put(BACKEND_URL, movie);
    navigate(`/movies/${movie.id}/details`);
  };

  const handleTextFieldChange =
    (fieldName: keyof Movie) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMovie({ ...movie, [fieldName]: event.target.value });
    };

  const handleRatingChange = (
    _: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    if (newRating !== null) setMovie({ ...movie, rating: newRating });
  };

  const handleLengthInMinutesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMovie({ ...movie, length_in_minutes: Number(event.target.value) });
  };

  const handleDirectorChange = (
    _: React.ChangeEvent<{}>,
    newDirector: Director | null
  ) => {
    if (newDirector !== null) {
      setDirector(newDirector);
      setMovie({ ...movie, director: newDirector.id });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            value={movie.name}
            onChange={handleTextFieldChange("name")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Release Date"
            value={movie.release_date}
            onChange={handleTextFieldChange("release_date")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Length"
            value={movie.length_in_minutes}
            onChange={handleLengthInMinutesChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">minutes</InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Rating
            name="rating"
            value={movie.rating}
            precision={0.1}
            max={10}
            onChange={handleRatingChange}
          />
        </Grid>

        {/* <Grid item xs={12}>
          <Autocomplete
            value={director}
            onChange={handleDirectorChange}
            options={directors}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Director" />}
          />
        </Grid> */}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export const MovieEdit = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();
  const [director, setDirector] = useState<Director>();
  const [directors, setDirectors] = useState<Director[]>();
  const axios = useAxios();

  const BACKEND_MOVIE_URL = `/movies/${movieId}/`;
  const BACKEND_DIRECTORS_URL = `/directors`;

  useEffect(() => {
    setLoading(true);
    const fetchMovie = async () => {
      if (directors === undefined) return;
      const { data: fetchedMovie } = await axios.get(BACKEND_MOVIE_URL);
      setMovie({ ...fetchedMovie, director: fetchedMovie.director.id });
      setLoading(false);
      setDirector(
        directors.find((director) => director.id === fetchedMovie.director.id)
      );
    };
    fetchMovie();
  }, [movieId, directors]);

  useEffect(() => {
    setLoading(true);
    const fetchDirectors = async () => {
      const { data } = await axios.get(BACKEND_DIRECTORS_URL);
      setDirectors(data.results);
    };
    fetchDirectors();
  }, []);

  return (
    <Container>
      {loading && <CircularProgress />}
      {!loading && directors !== undefined && movie !== undefined && (
        // director !== undefined && (
        <Card>
          <CardContent>
            <Typography variant="h1">Movie Edit</Typography>
            <IconButton component={Link} sx={{ mr: 3 }} to={"/movies"}>
              <ArrowBackIcon />
            </IconButton>
            <EditForm
              movie={movie}
              setMovie={setMovie}
              // director={director}
              setDirector={setDirector}
              directors={directors}
            />
          </CardContent>
          <CardActions sx={{ flexDirection: "row-reverse" }}>
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
