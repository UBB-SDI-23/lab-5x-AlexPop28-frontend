import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AllObjects } from "../../components/AllObjects";
import useAxios from "../../lib/hooks/useAxios";
import { Movie } from "../../models/movie";

const createMovieUrl = (page: number, pageSize: number, minRating: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("page_size", pageSize.toString());
  if (minRating > 0) searchParams.append("min_rating", minRating.toString());
  return `/movies?${searchParams.toString()}`;
};

export const AllMovies = () => {
  const [searchParams] = useSearchParams();
  const [minRating, setMinRating] = useState(
    Number(searchParams.get("min_rating")) || 0
  );
  const [inputMinRating, setInputMinRating] = useState(0);
  const navigate = useNavigate();
  const axios = useAxios();

  const createUrl = useCallback(
    (page: number, pageSize: number) =>
      createMovieUrl(page, pageSize, minRating),
    [minRating]
  );

  const getColumns = useCallback((page: number, pageSize: number) => {
    return [
      {
        headElement: <>#</>,
        bodyElement: (_: any, index: number) => (
          <>{pageSize * (page - 1) + index + 1}</>
        ),
      },
      {
        headElement: <>Name</>,
        bodyElement: (movie: Movie, _: any) => (
          <Link to={`/movies/${movie.id}/`} title="View movie details">
            {movie.name}
          </Link>
        ),
        sortKey: "name",
      },
      {
        headElement: <>Rating</>,
        bodyElement: (movie: Movie, _: any) => <>{movie.rating}</>,
        sortKey: "rating",
      },
      {
        headElement: <>Release year</>,
        bodyElement: (movie: Movie, _: any) => (
          <>{movie.release_date.substring(0, 4)}</>
        ),
        sortKey: "release_date",
      },
      {
        headElement: <>Length (minutes)</>,
        bodyElement: (movie: Movie, _: any) => <>{movie.length_in_minutes}</>,
        sortKey: "length_in_minutes",
      },
      {
        headElement: <>Number of actors</>,
        bodyElement: (movie: Movie, _: any) => <>{movie.number_of_actors}</>,
        sortKey: "number_of_actors",
      },
      {
        bodyElement: (movie: Movie, _: any) => (
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/movies/${movie.id}/`}
          >
            <EditIcon />
          </IconButton>
        ),
      },
    ];
  }, []);

  return (
    <AllObjects
      title="All movies"
      createUrl={createUrl}
      getColumns={getColumns}
    >
      <TextField
        label="Minimum rating"
        placeholder={"0"}
        onChange={(event) => setInputMinRating(Number(event.target.value))}
      />
      <Button onClick={() => setMinRating(inputMinRating)}>Filter</Button>
      <br />

      <Button>
        <Link to={`/movies/add`} title="Add new movie">
          Add new movie
        </Link>
      </Button>
    </AllObjects>
  );
};
