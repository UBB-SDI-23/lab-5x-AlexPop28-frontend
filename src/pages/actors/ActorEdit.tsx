import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import { DeleteButton } from "../../components/DeleteButton";
import { ActorForm } from "../../components/custom/ActorForm";
import useAxios from "../../lib/hooks/useAxios";
import { Actor, isActorValid } from "../../models/actor";
import { hasEditPermission } from "../../utils/permissions";

export const ActorEdit = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState<Actor>({
    name: "",
    alternative_name: "",
    date_of_birth: "",
    birthplace: "",
    height_in_cm: 0,
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [controlButtons, setControlButtons] = useState<JSX.Element>(<></>);
  const navigate = useNavigate();
  const axios = useAxios();
  const BASE_URL = `/actors/${actorId}/`;

  const fetchActor = async () => {
    setLoading(true);
    const { data: fetchedActor } = await axios.get(BASE_URL);
    setActor(fetchedActor);
    setLoading(false);
  };

  useEffect(() => {
    fetchActor();
  }, []);

  useEffect(() => {
    if (hasEditPermission(actor)) {
      console.log("GRANTED");
      setControlButtons(
        <>
          {disabled && (
            <IconButton sx={{ mr: 3 }} onClick={() => setDisabled(false)}>
              <Tooltip title="Make changes" arrow>
                <LockIcon />
              </Tooltip>
            </IconButton>
          )}
          {!disabled && (
            <>
              <IconButton
                sx={{ mr: 3 }}
                disabled={!isActorValid(actor)}
                onClick={onSaveChanges}
              >
                <Tooltip title="Save changes" arrow>
                  <LockOpenIcon />
                </Tooltip>
              </IconButton>
              <DeleteButton
                onDelete={async () => {
                  await axios.delete(`/actors/${actorId}/`);
                  navigate("/actors");
                }}
              />
            </>
          )}
        </>
      );
    } else {
      setControlButtons(<></>);
    }
  }, [actor, disabled]);

  const onSaveChanges = async () => {
    try {
      const { data } = await axios.put(BASE_URL, actor);
      setDisabled(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <CardContainer title={`${disabled ? "About the" : "Edit"} actor`}>
      <Typography variant="h1"></Typography>
      {disabled && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`/actors`}>
          <ArrowBackIcon />
        </IconButton>
      )}
      {loading && <CircularProgress />}
      {!loading && actor && (
        <ActorForm actor={actor} setActor={setActor} disabled={disabled}>
          {controlButtons}
        </ActorForm>
      )}
    </CardContainer>
  );
};
