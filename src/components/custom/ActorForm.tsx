import { InputAdornment, TextField } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Actor } from "../../models/actor";
import { GridLayout } from "../GridLayout";

interface ActorFormProps {
  actor: Actor;
  setActor: Dispatch<SetStateAction<Actor>>;
  disabled?: boolean;
  children: ReactNode;
}

export const ActorForm: FC<ActorFormProps> = ({
  actor,
  setActor,
  disabled = false,
  children,
}) => {
  return (
    <GridLayout>
      <TextField
        label="Name"
        value={actor.name}
        onChange={(event) => setActor({ ...actor, name: event.target.value })}
        fullWidth
        disabled={disabled}
      />
      <TextField
        label="Alternative name"
        value={actor.alternative_name}
        onChange={(event) =>
          setActor({ ...actor, alternative_name: event.target.value })
        }
        fullWidth
        disabled={disabled}
      />
      <TextField
        label="Date of birth"
        value={actor.date_of_birth}
        onChange={(event) =>
          setActor({ ...actor, date_of_birth: event.target.value })
        }
        disabled={disabled}
      />
      <TextField
        label="Birthplace"
        value={actor.birthplace}
        onChange={(event) =>
          setActor({ ...actor, birthplace: event.target.value })
        }
        disabled={disabled}
      />
      <TextField
        label="Height"
        value={actor.height_in_cm}
        onChange={(event) =>
          setActor({
            ...actor,
            height_in_cm: Number(event.target.value),
          })
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
        disabled={disabled}
      />
      {children}
    </GridLayout>
  );
};
