import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { AllObjects } from "../../components/AllObjects";
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
  return (
    <AllObjects
      title="All actors"
      createUrl={createActorUrl}
      getColumns={getColumns}
    >
      <Button>
        <Link to={`/actors/add`} title="Add new actor">
          Add new actor
        </Link>
      </Button>
    </AllObjects>
  );
};
