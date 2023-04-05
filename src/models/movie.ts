import { Director } from "./director";

export interface Movie {
  id?: number;
  name: string;
  rating: number;
  release_date: string;
  length_in_minutes: number;
  director: number | Director;
  actors?: number[];
  [key: string]: any;
}
