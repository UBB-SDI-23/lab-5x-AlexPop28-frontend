import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import { Director } from "../models/director";
import { Movie } from "../models/movie";

const EditForm = ({
  movie,
  setMovie,
  director,
  setDirector,
  directors,
}: {
  movie: Movie;
  setMovie: React.Dispatch<React.SetStateAction<Movie>>;
  director: Director;
  setDirector: React.Dispatch<React.SetStateAction<Director | undefined>>;
  directors: Director[];
}) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const BACKEND_URL = `${BACKEND_API_URL}/movies/`;
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    if (response.ok) {
      navigate(`/movies/`);
    }
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

        <Grid item xs={12}>
          <Autocomplete
            value={director}
            onChange={handleDirectorChange}
            options={directors}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Director" />}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export const MovieCreate = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>({
    name: "",
    rating: 0,
    release_date: "",
    length_in_minutes: 0,
    director: 0,
  });
  const [director, setDirector] = useState<Director>();
  const [directors, setDirectors] = useState<Director[]>();

  const BACKEND_DIRECTORS_URL = `${BACKEND_API_URL}/directors`;

  useEffect(() => {
    setLoading(true);
    const fetchDirectors = async () => {
      const response = await fetch(BACKEND_DIRECTORS_URL);
      const fetchedDirectors = await response.json();
      setDirectors(fetchedDirectors);
      if (fetchedDirectors.length > 0) setDirector(fetchedDirectors[0]);
      setLoading(false);
    };
    fetchDirectors();
  }, []);

  return (
    <Container>
      {loading && <CircularProgress />}
      {!loading && directors !== undefined && director !== undefined && (
        <Card>
          <CardContent>
            <Typography variant="h1">Create Movie</Typography>
            <IconButton component={Link} sx={{ mr: 3 }} to={"/movies"}>
              <ArrowBackIcon />
            </IconButton>
            <EditForm
              movie={movie}
              setMovie={setMovie}
              director={director}
              setDirector={setDirector}
              directors={directors}
            />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
