import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { CardContainer } from "../../components/CardContainer";
import { GridLayout } from "../../components/GridLayout";
import useAxios from "../../lib/hooks/useAxios";

export const AdminPage = () => {
  const axios = useAxios();
  const sendRequest = async (path: string) => {
    const response = await axios.post(`/admin/${path}/`);
    if (response.status == 200)
      toast.success("Success! This operation may take a few minutes.");
  };

  return (
    <CardContainer title="Admin">
      <h3>WARNING! All of the following operations are irreversible</h3>
      <GridLayout>
        <Button onClick={() => sendRequest("truncate_actors")}>
          Truncate actors
        </Button>
        <Button onClick={() => sendRequest("truncate_movies")}>
          Truncate movies
        </Button>
        <Button onClick={() => sendRequest("truncate_directors")}>
          Truncate directors
        </Button>
        <Button onClick={() => sendRequest("populate_actors")}>
          Populate actors
        </Button>
        <Button onClick={() => sendRequest("populate_movies")}>
          Populate movies
        </Button>
        <Button onClick={() => sendRequest("populate_directors")}>
          Populate directors
        </Button>
      </GridLayout>
    </CardContainer>
  );
};
