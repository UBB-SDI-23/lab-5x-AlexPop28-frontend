import { Movie } from "./movie";

export interface Actor {
  id?: number;
  name: string;
  alternative_name?: string;
  date_of_birth: string;
  birthplace: string;
  height_in_cm: number;
  movie_count?: number;
  movies?: Movie[];
  total_income?: number;
}

export const isActorValid = (actor: Actor) => {
  if (actor.name === "") return false;
  if (new Date(actor.date_of_birth) > new Date()) return false;
  if (actor.height_in_cm <= 0) return false;
  return true;
};
