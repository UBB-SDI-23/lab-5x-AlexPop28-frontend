import { Movie } from "./movie";

export interface Director {
  id?: number;
  name: string;
  alternative_name?: string;
  date_of_birth: string;
  birthplace: string;
  height_in_cm: number;
  movies?: Movie[];
}
