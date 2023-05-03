import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardContainer } from "../../components/CardContainer";
import { GridLayout } from "../../components/GridLayout";
import useAxios from "../../lib/hooks/useAxios";
import { UserProfile } from "../../models/UserProfile";

export const UserDetails = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    bio: "",
    location: "",
    gender: "",
    birthday: "",
    marital_status: "",
  });
  const user = localStorage.getItem("user");
  const [pageSize, setPageSize] = useState(() => {
    if (user) return JSON.parse(user).pageSize ?? 10;
    return 10;
  });
  const axios = useAxios();

  const BASE_URL = `/users/${username}`;

  const fetchUserProfile = async () => {
    setLoading(true);
    const { data } = await axios.get(BASE_URL);
    setUserProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <CardContainer title={`About ${username}`}>
      {loading && <CircularProgress />}
      {!loading && userProfile && (
        <GridLayout>
          <p>Bio: {userProfile.bio}</p>
          <p>Location: {userProfile.location}</p>
          <p>Gender: {userProfile.gender}</p>
          <p>Movies added: {userProfile.movie_count}</p>
          <p>Actors added: {userProfile.actor_count}</p>
          <p>Directors added: {userProfile.director_count}</p>
          {user && (
            <FormControl fullWidth>
              <InputLabel id="page-size-label">Page size</InputLabel>
              <Select
                labelId="page-size-label"
                label="Page size"
                value={pageSize}
                onChange={(event) => {
                  event.preventDefault();
                  const newPageSize = Number(event.target.value);
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      ...JSON.parse(user),
                      pageSize: newPageSize,
                    })
                  );
                  setPageSize(newPageSize);
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          )}
        </GridLayout>
      )}
    </CardContainer>
  );
};
