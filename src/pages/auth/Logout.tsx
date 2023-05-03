import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";

export const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <CardContainer title="Successfully logged out">
      Go back <Link to="/">home</Link>
    </CardContainer>
  );
};
