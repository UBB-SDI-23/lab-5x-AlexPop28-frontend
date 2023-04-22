import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardContainer } from "../../../components/CardContainer";
import { ActorMovieForm } from "../../../components/custom/ActorMovieForm";
import useAxios from "../../../lib/hooks/useAxios";
import { ActorMovie } from "../../../models/ActorMovie";
import { Movie } from "../../../models/movie";

export const AddMovieActor = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();
  const [actorMovie, setActorMovie] = useState<ActorMovie>({
    screen_time_in_minutes: 0,
    salary_in_usd: 0,
    character_name: "",
    actor: 0,
    movie: Number(movieId),
  });
  const navigate = useNavigate();
  const axios = useAxios();

  const fetchMovie = async () => {
    setLoading(true);
    const { data: fetchedMovie } = await axios.get(`/movies/${movieId}`);
    setMovie({ ...fetchedMovie, director: fetchedMovie.director.id });
    setLoading(false);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const onSubmit = async () => {
    try {
      console.log(movieId, actorMovie.movie);
      const { data } = await axios.post(
        `/movies/${movieId}/actors/`,
        actorMovie
      );
      navigate(`/movies/${movieId}/actors`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && movie && (
        <CardContainer title={`Add actor to ${movie.name}`}>
          <IconButton component={Link} sx={{ mr: 3 }} to={"/actors"}>
            <ArrowBackIcon />
          </IconButton>
          <ActorMovieForm actorMovie={actorMovie} setActorMovie={setActorMovie}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Add
            </Button>
          </ActorMovieForm>
        </CardContainer>
      )}
    </>
  );
};
