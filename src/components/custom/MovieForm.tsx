import { InputAdornment, Rating, TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Director } from "../../models/director";
import { Movie } from "../../models/movie";
import { GridLayout } from "../GridLayout";
import { DirectorInput } from "./DirectorInput";

interface MovieFormProps {
  movie: Movie;
  setMovie: Dispatch<SetStateAction<Movie>>;
  disabled?: boolean;
  defaultDirector?: Director;
  children: JSX.Element;
}

export const MovieForm: FC<MovieFormProps> = ({
  movie,
  setMovie,
  disabled = false,
  defaultDirector = undefined,
  children,
}) => {
  const [nameError, setNameError] = useState("");
  const [releaseDateError, setReleaseDateError] = useState("");
  const [lengthError, setLengthError] = useState("");
  return (
    <GridLayout>
      <TextField
        label="Name"
        value={movie.name}
        onChange={(event) => {
          const name = event.target.value;
          setMovie({ ...movie, name: name });
          setNameError(name === "" ? "Name cannot be empty" : "");
        }}
        fullWidth
        disabled={disabled}
        error={Boolean(nameError)}
        helperText={nameError}
      />

      <TextField
        label="Release Date"
        value={movie.release_date}
        onChange={(event) => {
          const release_date = event.target.value;
          if (new Date(release_date) > new Date())
            setReleaseDateError("Date cannot be in the future");
          else setReleaseDateError("");
          setMovie({ ...movie, release_date: release_date });
        }}
        disabled={disabled}
        error={Boolean(releaseDateError)}
        helperText={releaseDateError}
      />

      <TextField
        label="Length"
        value={movie.length_in_minutes}
        onChange={(event) => {
          setLengthError("");
          const length_in_minutes = Number(event.target.value);

          if (isNaN(length_in_minutes)) {
            setMovie({ ...movie, length_in_minutes: 0 });
            setLengthError("Length should be a positive number");
            return;
          }
          if (length_in_minutes <= 0)
            setLengthError("Length should be a positive number");
          setMovie({ ...movie, length_in_minutes: length_in_minutes });
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
        disabled={disabled}
        error={Boolean(lengthError)}
        helperText={lengthError}
      />

      <Rating
        name="rating"
        value={movie.rating}
        precision={0.1}
        max={10}
        onChange={(_, newRating) => {
          if (newRating !== null) setMovie({ ...movie, rating: newRating });
        }}
        disabled={disabled}
      />
      <DirectorInput
        setMovie={setMovie}
        defaultDirector={defaultDirector}
        disabled={disabled}
      />
      {children}
    </GridLayout>
  );
};
