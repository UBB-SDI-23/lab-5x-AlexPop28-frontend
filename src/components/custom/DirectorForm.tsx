import { InputAdornment, TextField } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
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
  return (
    <GridLayout>
      <TextField
        label="Name"
        value={director.name}
        onChange={(event) =>
          setDirector({ ...director, name: event.target.value })
        }
        fullWidth
        disabled={disabled}
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
        onChange={(event) =>
          setDirector({ ...director, date_of_birth: event.target.value })
        }
        disabled={disabled}
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
        onChange={(event) =>
          setDirector({
            ...director,
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
