import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GenericTable } from "../../components/GenericTable";
import { Pager } from "../../components/Pager";
import useAxios from "../../lib/hooks/useAxios";
import { Actor } from "../../models/actor";

const createActorUrl = (page: number, pageSize: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("page_size", pageSize.toString());
  return `/actors?${searchParams.toString()}`;
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
      bodyElement: (actor: Actor, _: any) => (
        <Link to={`/actors/${actor.id}/details`} title="View actor details">
          {actor.name +
            (actor.alternative_name ? ` (${actor.alternative_name})` : "")}
        </Link>
      ),
      sortKey: "name",
    },
    {
      headElement: <>Date of birth</>,
      bodyElement: (actor: Actor, _: any) => (
        <>{actor.date_of_birth.substring(0, 4)}</>
      ),
      sortKey: "date_of_birth",
    },
    {
      bodyElement: (actor: Actor, _: any) => (
        <>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/actors/${actor.id}/details`}
          >
            <Tooltip title="View actor details" arrow>
              <ReadMoreIcon color="primary" />
            </Tooltip>
          </IconButton>

          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/actors/${actor.id}/edit`}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/actors/${actor.id}/delete`}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];
};

export const AllActors = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [actors, setActors] = useState<Actor[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const axios = useAxios();

  const fetchActors = async () => {
    setLoading(true);
    const { data } = await axios.get(createActorUrl(page, pageSize));
    const { count, results } = data;
    setActors(results);
    setCount(count);
    setLoading(false);
    navigate(createActorUrl(page, pageSize), { replace: true });
  };

  useEffect(() => {
    fetchActors();
  }, [page, pageSize]);

  const columns = getColumns(page, pageSize);

  return (
    <Container>
      <Typography variant="h3">All actors</Typography>
      <Button>
        <Link to={`/actors/add`} title="Add new actor">
          Add new actor
        </Link>
      </Button>
      <br />

      {loading && <CircularProgress />}
      {!loading && (
        <>
          <GenericTable
            data={actors}
            columns={columns}
            noDataElement={
              <Typography variant="h4">No actors found</Typography>
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
