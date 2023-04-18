import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Pager } from "../components/Pager";
import useAxios from "../lib/hooks/useAxios";
import { Movie } from "../models/movie";

const createMovieUrl = (page: number, pageSize: number, minRating: number) => {
  return `/movies?page=${page}&page_size=${pageSize}&min_rating=${minRating}`;
};

export const AllMovies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState<{ column: string; order: "asc" | "desc" }>({
    column: "",
    order: "asc",
  });
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
  };

  const loadPage = () => {
    fetchMovies();
    navigate(createMovieUrl(page, pageSize, minRating), { replace: true });
  };

  useEffect(() => {
    loadPage();
  }, [page, pageSize]);

  const sortData = (column: string) => {
    const isAsc = sort.column === column && sort.order === "asc";
    setSort({ column, order: isAsc ? "desc" : "asc" });
    const sortedMovies = [...movies].sort((a: Movie, b: Movie) => {
      if (isAsc) {
        return a[column] < b[column] ? -1 : 1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setMovies(sortedMovies);
  };

  return (
    <Container>
      <h1>All movies</h1>
      <TextField
        label="Minimum rating"
        placeholder={"0"}
        onChange={(event) => setMinRating(Number(event.target.value))}
      />
      <Button
        onClick={() => {
          page === 1 ? loadPage() : setPage(1);
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
      {!loading && movies.length === 0 && (
        <Typography variant="h4">No movies found</Typography>
      )}
      {!loading && movies.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="left" onClick={() => sortData("name")}>
                    Name
                  </TableCell>
                  <TableCell align="right" onClick={() => sortData("rating")}>
                    Rating
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => sortData("release_date")}
                  >
                    Release year
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => sortData("length_in_minutes")}
                  >
                    Length (minutes)
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie, index) => (
                  <TableRow key={movie.id}>
                    <TableCell scope="row">
                      {pageSize * (page - 1) + index + 1}
                    </TableCell>
                    <TableCell scope="row">
                      <Link
                        to={`/movies/${movie.id}/details`}
                        title="View movie details"
                      >
                        {movie.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{movie.rating}</TableCell>
                    <TableCell align="right">
                      {movie.release_date.substring(0, 4)}
                    </TableCell>
                    <TableCell align="right">
                      {movie.length_in_minutes}
                    </TableCell>
                    <TableCell align="right">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
