import { QueryFunctionContext } from "@tanstack/react-query";
import {
  DailyCaloriesResult,
  IQueryKey,
  IUser,
  MonthlyExpensesResult,
} from "../types";
import { request } from "./api-instance";

export async function getMe(): Promise<IUser> {
  return (await request.get(`/me`)).data;
}

export async function checkCalorieLimit({
  queryKey: [_key, params],
}: QueryFunctionContext<IQueryKey>): Promise<DailyCaloriesResult[]> {
  return (
    await request.get(`/me/check/daily-calories`, {
      params,
    })
  ).data;
}

export async function checkBudgetLimit(): Promise<MonthlyExpensesResult[]> {
  return (await request.get(`/me/check/montly-budget`)).data;
}

export async function updateMe(payload: Omit<IUser, "id">): Promise<IUser> {
  return (await request.post(`/me`, payload)).data;
}
