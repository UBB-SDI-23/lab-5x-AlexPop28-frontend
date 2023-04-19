import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GenericTable } from "../components/GenericTable";
import { Pager } from "../components/Pager";
import useAxios from "../lib/hooks/useAxios";
import { Movie } from "../models/movie";

const createMovieUrl = (page: number, pageSize: number, minRating: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("page_size", pageSize.toString());
  if (minRating > 0) searchParams.append("min_rating", minRating.toString());
  return `/movies?${searchParams.toString()}`;
};

const getColumns = (page: number, pageSize: number) => {
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
        <Link to={`/movies/${movie.id}/details`} title="View movie details">
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
      bodyElement: (movie: Movie, _: any) => (
        <>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/movies/${movie.id}/details`}
          >
            <Tooltip title="View movie details" arrow>
              <ReadMoreIcon color="primary" />
            </Tooltip>
          </IconButton>

          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/movies/${movie.id}/edit`}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/movies/${movie.id}/delete`}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];
};

export const AllMovies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [minRating, setMinRating] = useState(
    Number(searchParams.get("min_rating")) || 0
  );
  const axios = useAxios();

  const fetchMovies = async () => {
    setLoading(true);
    const { data } = await axios.get(createMovieUrl(page, pageSize, minRating));
    const { count, results } = data;
    setMovies(results);
    setCount(count);
    setLoading(false);
    navigate(createMovieUrl(page, pageSize, minRating), { replace: true });
  };

  useEffect(() => {
    fetchMovies();
  }, [page, pageSize]);

  const columns = getColumns(page, pageSize);

  return (
    <Container>
      <Typography variant="h3">All movies</Typography>
      <TextField
        label="Minimum rating"
        placeholder={"0"}
        onChange={(event) => setMinRating(Number(event.target.value))}
      />
      <Button
        onClick={() => {
          page === 1 ? fetchMovies() : setPage(1);
        }}
      >
        Filter
      </Button>
      <br />

      <Button>
        <Link to={`/movies/add`} title="Add new movie">
          Add new movie
        </Link>
      </Button>
      <br />

      {loading && <CircularProgress />}
      {!loading && (
        <>
          <GenericTable
            data={movies}
            columns={columns}
            noDataElement={
              <Typography variant="h4">No movies found</Typography>
            }
          />
          <Pager
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            count={count}
          />
        </>
      )}
    </Container>
  );
};
