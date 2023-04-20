import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GenericForm } from "../../components/GenericForm";
import useAxios from "../../lib/hooks/useAxios";
import { Actor } from "../../models/actor";

export const ActorCreate = () => {
  const [actor, setActor] = useState<Actor>({
    name: "",
    alternative_name: "",
    date_of_birth: "",
    birthplace: "",
    height_in_cm: 0,
  });

  const navigate = useNavigate();
  const axios = useAxios();

  const editForm = (
    <GenericForm
      onSubmit={async () => {
        try {
          const { data, status } = await axios.post(`/actors/`, actor);
          navigate(`/actors/${data.id}/details`);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <TextField
        label="Name"
        value={actor.name}
        onChange={(event) => setActor({ ...actor, name: event.target.value })}
        fullWidth
      />
      <TextField
        label="Alternative name"
        value={actor.alternative_name}
        onChange={(event) =>
          setActor({ ...actor, alternative_name: event.target.value })
        }
        fullWidth
      />
      <TextField
        label="Date of birth"
        value={actor.date_of_birth}
        onChange={(event) =>
          setActor({ ...actor, date_of_birth: event.target.value })
        }
      />
      <TextField
        label="Birthplace"
        value={actor.birthplace}
        onChange={(event) =>
          setActor({ ...actor, birthplace: event.target.value })
        }
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
      />
    </GenericForm>
  );

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h1">Create actor</Typography>
          <IconButton component={Link} sx={{ mr: 3 }} to={"/actors"}>
            <ArrowBackIcon />
          </IconButton>
          {editForm}
        </CardContent>
      </Card>
    </Container>
  );
};
