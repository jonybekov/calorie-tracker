import { QueryFunctionContext } from "@tanstack/react-query";
import { IFood, IList, IQueryKey, IStatistics, IUser } from "../types";
import { request } from "./api-instance";

export const getStatistics = async (): Promise<IStatistics> => {
  return (await request.get("/statistics")).data;
};

export const getUsers = async (): Promise<IList<IUser>> => {
  return (await request.get("/users")).data;
};

export const getUser = async ({
  queryKey: [_key, userId],
}: QueryFunctionContext<IQueryKey<string>>): Promise<IUser> => {
  return (await request.get(`/users/${userId}`)).data;
};

export const getUserFoods = async ({
  queryKey,
}: QueryFunctionContext<IQueryKey<string>>): Promise<IList<IFood>> => {
  const [_key, userId] = queryKey;

  return (await request.get(`/users/${userId}/foods`)).data;
};
