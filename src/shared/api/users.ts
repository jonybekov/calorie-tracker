import { IUser } from "../types";
import { request } from "./api-instance";

export async function getMe(): Promise<IUser> {
  return (await request.get(`/users/me`)).data;
}
