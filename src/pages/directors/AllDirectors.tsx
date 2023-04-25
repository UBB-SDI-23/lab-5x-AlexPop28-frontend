import EditIcon from "@mui/icons-material/Edit";
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
      <Button>
        <Link to={`/directors/add`} title="Add new director">
          Add new director
        </Link>
      </Button>
    </AllObjects>
  );
};
