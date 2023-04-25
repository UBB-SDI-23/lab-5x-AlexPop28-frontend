import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import { ActorForm } from "../../components/custom/ActorForm";
import useAxios from "../../lib/hooks/useAxios";
import { Actor, isActorValid } from "../../models/actor";

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

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(`/actors/`, actor);
      navigate(`/actors/${data.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainer title="Create Actor">
      <IconButton component={Link} sx={{ mr: 3 }} to={"/actors"}>
        <ArrowBackIcon />
      </IconButton>
      <ActorForm actor={actor} setActor={setActor}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isActorValid(actor)}
          onClick={onSubmit}
        >
          Add
        </Button>
      </ActorForm>
    </CardContainer>
  );
};
