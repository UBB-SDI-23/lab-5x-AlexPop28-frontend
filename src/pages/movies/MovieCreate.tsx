import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import { MovieForm } from "../../components/custom/MovieForm";
import useAxios from "../../lib/hooks/useAxios";
import { Movie } from "../../models/movie";

export const MovieCreate = () => {
  const [movie, setMovie] = useState<Movie>({
    name: "",
    rating: 0,
    release_date: "",
    length_in_minutes: 0,
    director: 0,
  });

  const navigate = useNavigate();
  const axios = useAxios();
  const onSubmit = async () => {
    try {
      const { data } = await axios.post(`/movies`, movie);
      navigate(`/movies/${data.id}/details`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainer title="Create Movie">
      <IconButton component={Link} sx={{ mr: 3 }} to={"/movies"}>
        <ArrowBackIcon />
      </IconButton>
      <MovieForm movie={movie} setMovie={setMovie}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Add
        </Button>
      </MovieForm>
    </CardContainer>
  );
};
