import { QueryFunctionContext } from "@tanstack/react-query";
import { DailyCaloriesResult, IQueryKey, IUser } from "../types";
import { request } from "./api-instance";

export async function getMe(): Promise<IUser> {
  return (await request.get(`/me`)).data;
}

export async function checkCalorieLimit({
  queryKey,
}: QueryFunctionContext<IQueryKey>): Promise<DailyCaloriesResult[]> {
  const [_key, params] = queryKey;

  return (
    await request.get(`/me/check/daily-calories`, {
      params,
    })
  ).data;
}

export async function updateMe(payload: Omit<IUser, "id">): Promise<IUser> {
  return (await request.post(`/me`, payload)).data;
}
