import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AllObjects } from "../../components/AllObjects";
import { Director } from "../../models/director";

const createDirectorUrl = (page: number, pageSize: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("page_size", pageSize.toString());
  return `/directors/by_last_release_date?${searchParams.toString()}`;
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
      headElement: <>Last release</>,
      bodyElement: (director: Director, _: any) => (
        <>{director.last_movie_release_date}</>
      ),
      sortKey: "last_movie_release_date",
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

export const DirectorsByLastMovie = () => {
  return (
    <AllObjects
      title="Directors sorted by latest movie"
      createUrl={createDirectorUrl}
      getColumns={getColumns}
    />
  );
};
