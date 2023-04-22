import { Autocomplete, TextField } from "@mui/material";
import { debounce } from "lodash";
import { FC, SetStateAction, useEffect, useMemo, useState } from "react";
import useAxios from "../../lib/hooks/useAxios";
import { Director } from "../../models/director";
import { Movie } from "../../models/movie";

interface DirectorInputProps {
  setMovie: React.Dispatch<SetStateAction<Movie>>;
  defaultDirector?: Director;
  disabled?: boolean;
}

export const DirectorInput: FC<DirectorInputProps> = ({
  setMovie,
  defaultDirector = undefined,
  disabled = false,
}) => {
  const [director, setDirector] = useState<Director | null>(
    defaultDirector ?? null
  );
  const [directors, setDirectors] = useState<Director[]>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [directorLoading, setDirectorLoading] = useState(true);
  const axios = useAxios();

  const fetchDirectors = async (name: string) => {
    setDirectorLoading(true);
    const BACKEND_DIRECTORS_URL = `/directors?page=${page}&page_size=${pageSize}&name=${name}`;
    const { data } = await axios.get(BACKEND_DIRECTORS_URL);
    let fetchedDirectors = data.results;
    if (director) {
      if (!fetchedDirectors.find((d: Director) => d.id === director.id)) {
        fetchedDirectors.push(director);
      }
    }
    setDirectors(fetchedDirectors);
    setDirectorLoading(false);
  };

  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchDirectors, 500),
    [page, pageSize, director]
  );

  useEffect(() => {
    fetchDirectors("");
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, []);

  const handleDirectorChange = (
    _: React.ChangeEvent<{}>,
    newDirector: Director | null
  ) => {
    if (newDirector !== null) {
      setDirector(newDirector);
      setMovie((movie: Movie) => {
        return { ...movie, director: newDirector.id } as Movie;
      });
    }
  };

  const handleDirectorInputChange = (
    _: React.ChangeEvent<{}>,
    value: string
  ) => {
    debouncedFetchSuggestions(value);
  };

  return (
    <Autocomplete
      value={director}
      loading={directorLoading}
      options={directors ?? []}
      renderInput={(params) => <TextField {...params} label="Director" />}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        );
      }}
      onInputChange={handleDirectorInputChange}
      onChange={handleDirectorChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disabled={disabled}
    />
  );
};
