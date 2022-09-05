import { QueryFunctionContext } from "@tanstack/react-query";
import {
  IFood,
  IFoodForm,
  IFoodFormParams,
  IList,
  IQueryKey,
  IStatistics,
  IUser,
} from "../types";
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
  queryKey: [_key, userId],
}: QueryFunctionContext<IQueryKey<string>>): Promise<IList<IFood>> => {
  return (await request.get(`/users/${userId}/foods`)).data;
};

export const createUserFood = async ({
  userId,
  ...payload
}: IFoodForm & IFoodFormParams) => {
  return (await request.post(`/users/${userId}/foods`, payload)).data;
};

export const updateUserFood = async ({
  userId,
  foodId,
  ...payload
}: IFoodForm & IFoodFormParams) => {
  return (await request.put(`/users/${userId}/foods/${foodId}`, payload)).data;
};

export const deleteUserFood = async ({ userId, foodId }: IFoodFormParams) => {
  return (await request.delete(`/users/${userId}/foods/${foodId}`)).data;
};
