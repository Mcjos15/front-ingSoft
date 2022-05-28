import { User } from "../usuarios/interfaces/users.interface";
import { Authentication } from "./authentication.interface";

export interface ResponseI {

  user: User;
  authentication: Authentication;
  img: string;
  //este token aca es temporal
  token:string

}
