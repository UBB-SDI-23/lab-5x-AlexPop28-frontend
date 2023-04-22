import { InputAdornment, TextField } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { ActorMovie } from "../../models/ActorMovie";
import { GridLayout } from "../GridLayout";

interface ActorMovieFormProps {
  actorMovie: ActorMovie;
  setActorMovie: Dispatch<SetStateAction<ActorMovie>>;
  disabled?: boolean;
  children: ReactNode;
}

export const ActorMovieForm: FC<ActorMovieFormProps> = ({
  actorMovie,
  setActorMovie,
  disabled = false,
  children,
}) => {
  return (
    <GridLayout>
      <TextField
        label="Actor ID"
        value={actorMovie.actor}
        onChange={(event) =>
          setActorMovie({ ...actorMovie, actor: Number(event.target.value) })
        }
        disabled={disabled}
      />
      <TextField
        label="Character name"
        value={actorMovie.character_name}
        onChange={(event) =>
          setActorMovie({ ...actorMovie, character_name: event.target.value })
        }
        disabled={disabled}
      />
      <TextField
        label="Salary"
        value={actorMovie.salary_in_usd}
        onChange={(event) =>
          setActorMovie({
            ...actorMovie,
            salary_in_usd: Number(event.target.value),
          })
        }
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="Screen time"
        value={actorMovie.screen_time_in_minutes}
        onChange={(event) =>
          setActorMovie({
            ...actorMovie,
            screen_time_in_minutes: Number(event.target.value),
          })
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
        disabled={disabled}
      />
      {children}
    </GridLayout>
  );
};
