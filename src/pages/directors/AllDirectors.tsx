import AnalyticsIcon from "@mui/icons-material/Analytics";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AllObjects } from "../../components/AllObjects";
import { Director } from "../../models/director";

const createDirectorUrl = (page: number, pageSize: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("page_size", pageSize.toString());
  return `/directors?${searchParams.toString()}`;
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
      bodyElement: (director: Director, _: any) => (
        <Link to={`/directors/${director.id}/`} title="View director details">
          {director.name +
            (director.alternative_name
              ? ` (${director.alternative_name})`
              : "")}
        </Link>
      ),
      sortKey: "name",
    },
    {
      headElement: <>Date of birth</>,
      bodyElement: (director: Director, _: any) => (
        <>{director.date_of_birth.substring(0, 4)}</>
      ),
      sortKey: "date_of_birth",
    },
    {
      headElement: <>Movie count</>,
      bodyElement: (director: Director, _: any) => <>{director.movie_count}</>,
      sortKey: "movie_count",
    },
    {
      headElement: <>Added by</>,
      bodyElement: (director: Director, _: any) => (
        <Link to={`/users/${director.username}/`} title="View user details">
          {director.username}
        </Link>
      ),
      sortKey: "username",
    },
    {
      bodyElement: (director: Director, _: any) => (
        <IconButton
          component={Link}
          sx={{ mr: 3 }}
          to={`/directors/${director.id}/`}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];
};

export const AllDirectors = () => {
  return (
    <AllObjects
      title="All directors"
      createUrl={createDirectorUrl}
      getColumns={getColumns}
    >
      <Button
        to={`/directors/add`}
        component={Link}
        sx={{ mr: 5 }}
        startIcon={<PersonAddIcon />}
      >
        Add new director
      </Button>
      <Button
        to="/directors/by_last_release_date"
        component={Link}
        startIcon={<AnalyticsIcon />}
      >
        Sort by latest movie
      </Button>
    </AllObjects>
  );
};
