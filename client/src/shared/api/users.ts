import { ILimitCheck, IUser } from "../types";
import { request } from "./api-instance";

export async function getMe(): Promise<IUser> {
  return (await request.get(`/users/me`)).data;
}

export async function checkCalorieLimit(): Promise<ILimitCheck> {
  return (await request.get(`/users/me/check/daily-calories`)).data;
}

export async function updateMe(payload: Omit<IUser, "id">): Promise<IUser> {
  return (await request.post(`/users/me`, payload)).data;
}
