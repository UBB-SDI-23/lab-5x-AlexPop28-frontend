import { InputAdornment, Rating, TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { Movie } from "../../models/movie";
import { GenericForm } from "../GenericForm";
import { DirectorInput } from "./DirectorInput";

interface MovieFormProps {
  movie: Movie;
  setMovie: Dispatch<SetStateAction<Movie>>;
  onSubmit: () => void;
  disabled?: boolean;
}

export const MovieForm: FC<MovieFormProps> = ({
  movie,
  setMovie,
  onSubmit,
  disabled = false,
}) => {
  return (
    <GenericForm onSubmit={onSubmit}>
      <TextField
        label="Name"
        value={movie.name}
        onChange={(event) => setMovie({ ...movie, name: event.target.value })}
        fullWidth
        disabled={disabled}
      />

      <TextField
        label="Release Date"
        value={movie.release_date}
        onChange={(event) =>
          setMovie({ ...movie, release_date: event.target.value })
        }
        disabled={disabled}
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
        disabled={disabled}
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
      <DirectorInput setMovie={setMovie} disabled={disabled} />
    </GenericForm>
  );
};
