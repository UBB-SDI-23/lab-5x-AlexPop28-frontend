import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AllObjects } from "../../components/AllObjects";
import { UsernameRoleDTO } from "../../models/UserProfile";

const createUserUrl = (page: number, pageSize: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("page_size", pageSize.toString());
  return `/users?${searchParams.toString()}`;
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
      headElement: <>Username</>,
      bodyElement: (user: UsernameRoleDTO, _: any) => (
        <Link to={`/users/${user.username}/`} title="View user details">
          {user.username}
        </Link>
      ),
      sortKey: "username",
    },
    {
      headElement: <>Role</>,
      bodyElement: (user: UsernameRoleDTO, _: any) => <>{user.role}</>,
      sortKey: "role",
    },
    {
      bodyElement: (user: UsernameRoleDTO, _: any) => (
        <IconButton
          component={Link}
          sx={{ mr: 3 }}
          to={`/users/${user.username}/`}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];
};

export const AllUsers = () => {
  return (
    <AllObjects
      title="All users"
      createUrl={createUserUrl}
      getColumns={getColumns}
    />
  );
};
