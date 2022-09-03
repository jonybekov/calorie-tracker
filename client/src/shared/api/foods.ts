import { QueryFunctionContext } from "@tanstack/react-query";
import { ID, IFood, IFoodForm, IGetFoodParams, IList } from "../types";
import { request } from "./api-instance";

export async function getFoods({
  queryKey,
}: QueryFunctionContext): Promise<IList<IFood>> {
  const [_key, params] = queryKey;

  return (
    await request.get("/foods", {
      params,
    })
  ).data;
}

export function getFood(id: string) {
  return request.get(`/foods/${id}`);
}

export function createFood(payload: IFoodForm) {
  return request.post("/foods", payload);
}

export function updateFood(payload: IFoodForm & { id: ID }) {
  const { id, ...data } = payload;
  return request.put(`/foods/${id}`, data);
}

export function deleteFood(id: ID) {
  return request.delete(`/foods/${id}`);
}
