import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AllObjects } from "../../../components/AllObjects";
import useAxios from "../../../lib/hooks/useAxios";
import { ActorMovie } from "../../../models/ActorMovie";
import { Movie } from "../../../models/movie";

const createMovieActorsUrl =
  (movieId?: string) => (page: number, pageSize: number) => {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page.toString());
    searchParams.append("page_size", pageSize.toString());
    return `/movies/${movieId}/actors?${searchParams.toString()}`;
  };

const getMovieActorsColumns =
  (movieId?: string) => (page: number, pageSize: number) => {
    return [
      {
        headElement: <>#</>,
        bodyElement: (_: any, index: number) => (
          <>{pageSize * (page - 1) + index + 1}</>
        ),
      },
      {
        headElement: <>Character</>,
        bodyElement: (actorMovie: ActorMovie, _: any) => (
          <>{actorMovie.character_name}</>
        ),
        sortKey: "character_name",
      },
      {
        headElement: <>Actor</>,
        bodyElement: (actorMovie: ActorMovie, _: any) => (
          <Link to={`/actors/${actorMovie.actor}`} title="View actor details">
            {actorMovie.actor_name}
          </Link>
        ),
        sortKey: "actor_name",
      },
      {
        headElement: <>Salary</>,
        bodyElement: (actorMovie: ActorMovie, _: any) => (
          <>{`$ ${actorMovie.salary_in_usd}`}</>
        ),
        sortKey: "salary_in_usd",
      },
      {
        headElement: <>Screen time</>,
        bodyElement: (actorMovie: ActorMovie, _: any) => (
          <>{`${actorMovie.screen_time_in_minutes} minutes`}</>
        ),
        sortKey: "screen_time_in_minutes",
      },
      {
        headElement: <>Added by</>,
        bodyElement: (actorMovie: ActorMovie, _: any) => (
          <>{actorMovie.username}</>
        ),
        sortKey: "username",
      },
    ];
  };

export const AllMovieActors = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();
  const createUrl = useMemo(() => createMovieActorsUrl(movieId), []);
  const getColumns = useMemo(() => getMovieActorsColumns(movieId), []);
  const axios = useAxios();
  const BASE_URL = `/movies/${movieId}/`;

  const fetchMovie = async () => {
    setLoading(true);
    const { data: fetchedMovie } = await axios.get(BASE_URL);
    setMovie({ ...fetchedMovie, director: fetchedMovie.director.id });
    setLoading(false);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && movie && (
        <AllObjects
          title={`Cast of ${movie.name}`}
          createUrl={createUrl}
          getColumns={getColumns}
        >
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/movies/${movie.id}`}
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
            variant={"text"}
            to={`/movies/${movie.id}/actors/add`}
            component={Link}
            color="inherit"
            sx={{ mr: 5 }}
            startIcon={<PersonAddIcon />}
          >
            Add actor
          </Button>
        </AllObjects>
      )}
    </>
  );
};
