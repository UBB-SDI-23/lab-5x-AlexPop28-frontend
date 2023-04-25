import { InputAdornment, TextField } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { Director } from "../../models/director";
import { GridLayout } from "../GridLayout";

interface DirectorFormProps {
  director: Director;
  setDirector: Dispatch<SetStateAction<Director>>;
  disabled?: boolean;
  children: ReactNode;
}

export const DirectorForm: FC<DirectorFormProps> = ({
  director,
  setDirector,
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
        value={director.name}
        onChange={(event) => {
          const name = event.target.value;
          setDirector({ ...director, name: name });
          setNameError(name === "" ? "Name cannot be empty" : "");
        }}
        fullWidth
        disabled={disabled}
        error={Boolean(nameError)}
        helperText={nameError}
      />
      <TextField
        label="Alternative name"
        value={director.alternative_name}
        onChange={(event) =>
          setDirector({ ...director, alternative_name: event.target.value })
        }
        fullWidth
        disabled={disabled}
      />
      <TextField
        label="Date of birth"
        value={director.date_of_birth}
        onChange={(event) => {
          const date_of_birth = event.target.value;
          if (new Date(date_of_birth) > new Date())
            setDateOfBirthError("Date cannot be in the future");
          else setDateOfBirthError("");
          setDirector({ ...director, date_of_birth: date_of_birth });
        }}
        disabled={disabled}
        error={Boolean(dateOfBirthError)}
        helperText={dateOfBirthError}
      />
      <TextField
        label="Birthplace"
        value={director.birthplace}
        onChange={(event) =>
          setDirector({ ...director, birthplace: event.target.value })
        }
        disabled={disabled}
      />
      <TextField
        label="Height"
        value={director.height_in_cm}
        onChange={(event) => {
          setHeightError("");
          console.log(event.target.value);
          const height_in_cm: number = Number(event.target.value);

          if (isNaN(height_in_cm)) {
            setDirector({ ...director, height_in_cm: 0 });
            setHeightError("Height should be a positive number");
            return;
          }
          if (height_in_cm <= 0)
            setHeightError("Height should be a positive number");
          setDirector({ ...director, height_in_cm: height_in_cm });
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
