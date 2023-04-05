import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";

export const MovieDelete = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const BACKEND_URL = `${BACKEND_API_URL}/movies/${movieId}/`;
    const response = await fetch(BACKEND_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    navigate("/movies");
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/movies");
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/movies`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          Are you sure you want to delete this movie? This operation cannot be
          undone!
        </CardContent>
        <CardActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardActions>
      </Card>
    </Container>
  );
};
