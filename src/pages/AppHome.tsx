import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AppHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h1">Welcome!</Typography>
      <Button onClick={() => navigate("/movies")}>Movies</Button>
    </>
  );
};
