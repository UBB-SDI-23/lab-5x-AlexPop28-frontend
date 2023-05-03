import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import useAxios from "../../lib/hooks/useAxios";

export const Activate = () => {
  const { activationCode } = useParams();
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState<boolean>();
  const axios = useAxios();

  const activate = async () => {
    try {
      console.log({ activation_code: activationCode });
      const { data } = await axios.put("/activate/", {
        activation_code: activationCode,
      });

      setMessage(data.success);
      setSuccessful(true);
    } catch (error: any) {
      setMessage(
        (error.response && error.response.data && error.response.data.error) ||
          error.message ||
          error.toString()
      );
      setSuccessful(false);
    }
  };

  useEffect(() => {
    activate();
  }, []);

  return (
    <CardContainer title="Account activation">
      {successful !== undefined && (
        <Alert severity={successful ? "success" : "error"}>{message}</Alert>
      )}
    </CardContainer>
  );
};
