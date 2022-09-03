import { ILoginForm, ILoginResponse, IRegisterForm } from "../types";
import { request } from "./api-instance";

export async function login(data: ILoginForm): Promise<ILoginResponse> {
  return (await request.post("/login", data)).data;
}

export async function register(data: IRegisterForm): Promise<ILoginResponse> {
  return (await request.post("/register", data)).data;
}
