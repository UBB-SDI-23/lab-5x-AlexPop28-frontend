import { User } from "./User";

export interface UserProfile {
  user?: User;
  bio: string;
  location: string;
  birthday: Date;
  gender: string;
  movie_count?: number;
  actor_count?: number;
  director_count?: number;
}
