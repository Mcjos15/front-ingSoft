import { User } from "../usuarios/interfaces/users.interface";
import { Authentication } from "./authentication.interface";

export interface ResponseI {

  user: User;
  authentication: Authentication;
  img: string;

}
