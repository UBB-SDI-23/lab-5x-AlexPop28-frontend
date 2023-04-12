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
  debounce,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import { Director } from "../models/director";
import { Movie } from "../models/movie";

export const MovieCreate = () => {
  const [loading, setLoading] = useState(true);
  const [directorLoading, setDirectorLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>({
    name: "",
    rating: 0,
    release_date: "",
    length_in_minutes: 0,
    director: 0,
  });
  const [director, setDirector] = useState<Director>();
  const [directors, setDirectors] = useState<Director[]>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const BACKEND_DIRECTORS_URL = `${BACKEND_API_URL}/directors`;
  const fetchDirectors = async (name: string) => {
    setDirectorLoading(true);
    const response = await fetch(
      BACKEND_DIRECTORS_URL + `?page=${page}&page_size=${pageSize}&name=${name}`
    );
    const data = await response.json();
    const fetchedDirectors = data.results;
    setDirectors(fetchedDirectors);
    // if (fetchedDirectors.length > 0) setDirector(fetchedDirectors[0]);
    setLoading(false);
    setDirectorLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDirectors("");
  }, []);

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

  const debouncedFetchSuggestions = useCallback(debounce(fetchDirectors, 500), [
    page,
  ]);

  const handleDirectorInputChange = (
    _: React.ChangeEvent<{}>,
    value: string
  ) => {
    debouncedFetchSuggestions(value);
  };

  const editForm = (
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
            loading={directorLoading}
            onChange={handleDirectorChange}
            onInputChange={handleDirectorInputChange}
            options={directors as Director[]}
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
            {editForm}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
