import { IUser } from "./users";

export interface ILoginForm {
  login: string;
  password: string;
}

export interface ILoginResponse extends IUser {
  access_token: string;
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  avatar: string | null;
  login: string;
  password: string;
  confirmPassword?: string;
}
