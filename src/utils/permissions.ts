import { ActorMovie } from "../models/ActorMovie";
import { Actor } from "../models/actor";
import { Director } from "../models/director";
import { Movie } from "../models/movie";

export const hasEditPermission = (
  object: Movie | Actor | Director | ActorMovie
): boolean => {
  const userString = localStorage.getItem("user");
  if (!userString) return false;
  const user = JSON.parse(userString);
  if (!user.role) return false;
  if (user.role == "moderator" || user.role == "admin") return true;
  // user is a regular user -> can edit if they own the object
  return object.username == user.username;
};

export const isAdmin = (): boolean => {
  const userString = localStorage.getItem("user");
  if (!userString) return false;
  const user = JSON.parse(userString);
  return user.role == "admin";
};
