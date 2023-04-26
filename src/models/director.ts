import { Movie } from "./movie";

export interface Director {
  id?: number;
  name: string;
  alternative_name?: string;
  date_of_birth: string;
  birthplace: string;
  height_in_cm: number;
  movie_count?: number;
  movies?: Movie[];
  last_movie_release_date?: string;
}

export const isDirectorValid = (director: Director) => {
  if (director.name === "") return false;
  if (new Date(director.date_of_birth) > new Date()) return false;
  if (director.height_in_cm <= 0) return false;
  return true;
};
