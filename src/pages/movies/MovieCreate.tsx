import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GenericForm } from "../../components/GenericForm";
import useAxios from "../../lib/hooks/useAxios";
import { Director } from "../../models/director";
import { Movie } from "../../models/movie";

const DirectorInput = ({
  setMovie,
}: {
  setMovie: React.Dispatch<SetStateAction<Movie>>;
}) => {
  const [director, setDirector] = useState<Director | null>(null);
  const [directors, setDirectors] = useState<Director[]>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [directorLoading, setDirectorLoading] = useState(true);
  const axios = useAxios();

  const fetchDirectors = async (name: string) => {
    setDirectorLoading(true);
    const BACKEND_DIRECTORS_URL = `/directors?page=${page}&page_size=${pageSize}&name=${name}`;
    const { data } = await axios.get(BACKEND_DIRECTORS_URL);
    const fetchedDirectors = data.results;
    setDirectors(fetchedDirectors);
    setDirectorLoading(false);
  };

  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchDirectors, 500),
    [page, pageSize]
  );

  useEffect(() => {
    fetchDirectors("");
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, []);

  const handleDirectorChange = (
    _: React.ChangeEvent<{}>,
    newDirector: Director | null
  ) => {
    if (newDirector !== null) {
      setDirector(newDirector);
      setMovie((movie: Movie) => {
        return { ...movie, director: newDirector.id };
      });
    }
  };

  const handleDirectorInputChange = (
    _: React.ChangeEvent<{}>,
    value: string
  ) => {
    debouncedFetchSuggestions(value);
  };

  return (
    <Autocomplete
      value={director}
      loading={directorLoading}
      options={directors ?? []}
      renderInput={(params) => <TextField {...params} label="Director" />}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        );
      }}
      onInputChange={handleDirectorInputChange}
      onChange={handleDirectorChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
};

export const MovieCreate = () => {
  const [movie, setMovie] = useState<Movie>({
    name: "",
    rating: 0,
    release_date: "",
    length_in_minutes: 0,
    director: 0,
  });

  const navigate = useNavigate();
  const axios = useAxios();

  const editForm = (
    <GenericForm
      onSubmit={async () => {
        const BACKEND_URL = `/movies/`;
        try {
          const { data, status } = await axios.post(BACKEND_URL, movie);
          navigate(`/movies/${data.id}/details`);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <TextField
        label="Name"
        value={movie.name}
        onChange={(event) => setMovie({ ...movie, name: event.target.value })}
        fullWidth
      />

      <TextField
        label="Release Date"
        value={movie.release_date}
        onChange={(event) =>
          setMovie({ ...movie, release_date: event.target.value })
        }
      />

      <TextField
        label="Length"
        value={movie.length_in_minutes}
        onChange={(event) =>
          setMovie({
            ...movie,
            length_in_minutes: Number(event.target.value),
          })
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />

      <Rating
        name="rating"
        value={movie.rating}
        precision={0.1}
        max={10}
        onChange={(_, newRating) => {
          if (newRating !== null) setMovie({ ...movie, rating: newRating });
        }}
      />
      <DirectorInput setMovie={setMovie} />
    </GenericForm>
  );

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h1">Create Movie</Typography>
          <IconButton component={Link} sx={{ mr: 3 }} to={"/movies"}>
            <ArrowBackIcon />
          </IconButton>
          {editForm}
        </CardContent>
      </Card>
    </Container>
  );
};
