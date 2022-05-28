import { LoginI } from "./login.interface";

export interface Authentication {

  ascii: string;
  otpauth_url: string;
  token:string
  logIn:LoginI

}
