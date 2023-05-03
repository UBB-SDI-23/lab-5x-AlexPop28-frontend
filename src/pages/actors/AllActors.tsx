import AnalyticsIcon from "@mui/icons-material/Analytics";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, IconButton } from "@mui/material";
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
        <Link to={`/actors/${actor.id}/`} title="View actor details">
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
      headElement: <>Movie count</>,
      bodyElement: (actor: Actor, _: any) => <>{actor.movie_count}</>,
      sortKey: "movie_count",
    },
    {
      headElement: <>Added by</>,
      bodyElement: (actor: Actor, _: any) => (
        <Link to={`/users/${actor.username}/`} title="View user details">
          {actor.username}
        </Link>
      ),
      sortKey: "username",
    },
    {
      bodyElement: (actor: Actor, _: any) => (
        <IconButton component={Link} sx={{ mr: 3 }} to={`/actors/${actor.id}/`}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];
};

export const AllActors = () => {
  const user = localStorage.getItem("user");
  return (
    <AllObjects
      title="All actors"
      createUrl={createActorUrl}
      getColumns={getColumns}
    >
      {user && (
        <Button
          to={`/actors/add`}
          component={Link}
          sx={{ mr: 5 }}
          startIcon={<PersonAddIcon />}
        >
          Add new actor
        </Button>
      )}
      <Button
        to="/actors/by_total_income"
        component={Link}
        startIcon={<AnalyticsIcon />}
      >
        Sort by total income
      </Button>
    </AllObjects>
  );
};
