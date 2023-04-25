import { InputAdornment, TextField } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
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
  const [nameError, setNameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [heightError, setHeightError] = useState("");
  return (
    <GridLayout>
      <TextField
        label="Name"
        value={actor.name}
        onChange={(event) => {
          const name = event.target.value;
          setActor({ ...actor, name: name });
          setNameError(name === "" ? "Name cannot be empty" : "");
        }}
        fullWidth
        disabled={disabled}
        error={Boolean(nameError)}
        helperText={nameError}
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
        onChange={(event) => {
          const date_of_birth = event.target.value;
          if (new Date(date_of_birth) > new Date())
            setDateOfBirthError("Date cannot be in the future");
          else setDateOfBirthError("");
          setActor({ ...actor, date_of_birth: date_of_birth });
        }}
        disabled={disabled}
        error={Boolean(dateOfBirthError)}
        helperText={dateOfBirthError}
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
        onChange={(event) => {
          console.log(event.target.value);
          const height_in_cm: number = Number(event.target.value);
          setHeightError("");
          if (isNaN(height_in_cm)) {
            setActor({ ...actor, height_in_cm: 0 });
            setHeightError("Height should be a positive number");
            return;
          }
          if (height_in_cm < 0)
            setHeightError("Height should be a positive number");
          setActor({ ...actor, height_in_cm: height_in_cm });
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
        disabled={disabled}
        error={Boolean(heightError)}
        helperText={heightError}
      />
      {children}
    </GridLayout>
  );
};
