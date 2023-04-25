import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import { DeleteButton } from "../../components/DeleteButton";
import { DirectorForm } from "../../components/custom/DirectorForm";
import useAxios from "../../lib/hooks/useAxios";
import { Director, isDirectorValid } from "../../models/director";

export const DirectorEdit = () => {
  const { directorId } = useParams();
  const [director, setDirector] = useState<Director>({
    name: "",
    alternative_name: "",
    date_of_birth: "",
    birthplace: "",
    height_in_cm: 0,
  });
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const axios = useAxios();
  const BASE_URL = `/directors/${directorId}/`;

  const fetchDirector = async () => {
    setLoading(true);
    const { data: fetchedDirector } = await axios.get(BASE_URL);
    setDirector(fetchedDirector);
    setLoading(false);
  };

  useEffect(() => {
    fetchDirector();
  }, []);

  const onSaveChanges = async () => {
    try {
      const { data } = await axios.put(BASE_URL, director);
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const controlButtons = (
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
            disabled={!isDirectorValid(director)}
            onClick={onSaveChanges}
          >
            <Tooltip title="Save changes" arrow>
              <LockOpenIcon />
            </Tooltip>
          </IconButton>
          <DeleteButton
            onDelete={async () => {
              await axios.delete(`/directors/${directorId}/`);
              navigate("/directors");
            }}
          />
        </>
      )}
    </>
  );

  return (
    <CardContainer title={`${disabled ? "About the" : "Edit"} director`}>
      {disabled && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`/directors`}>
          <ArrowBackIcon />
        </IconButton>
      )}
      {loading && <CircularProgress />}
      {!loading && director && (
        <DirectorForm
          director={director}
          setDirector={setDirector}
          disabled={disabled}
        >
          {controlButtons}
        </DirectorForm>
      )}
    </CardContainer>
  );
};
