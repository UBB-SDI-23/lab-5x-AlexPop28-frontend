import { Director } from "./director";

export interface Movie {
  id?: number;
  name: string;
  rating: number;
  release_date: string;
  length_in_minutes: number;
  director: number | Director;
  actor_count?: number;
  actors?: number[];
}

export const isMovieValid = (movie: Movie) => {
  if (movie.name === "") return false;
  if (new Date(movie.release_date) > new Date()) return false;
  if (movie.length_in_minutes <= 0) return false;
  return true;
};
