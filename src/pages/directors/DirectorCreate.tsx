import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import { DirectorForm } from "../../components/custom/DirectorForm";
import useAxios from "../../lib/hooks/useAxios";
import { Director, isDirectorValid } from "../../models/director";

export const DirectorCreate = () => {
  const [director, setDirector] = useState<Director>({
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
      const { data } = await axios.post(`/directors/`, director);
      navigate(`/directors/${data.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainer title="Create Director">
      <IconButton component={Link} sx={{ mr: 3 }} to={"/directors"}>
        <ArrowBackIcon />
      </IconButton>
      <DirectorForm director={director} setDirector={setDirector}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isDirectorValid(director)}
          onClick={onSubmit}
        >
          Add
        </Button>
      </DirectorForm>
    </CardContainer>
  );
};
