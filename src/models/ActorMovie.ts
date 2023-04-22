import { Movie } from "./movie";

export interface ActorMovie {
  id?: number;
  screen_time_in_minutes: number;
  salary_in_usd: number;
  character_name: string;
  actor: number;
  movie: number | Movie;
  actor_name: string;
}
