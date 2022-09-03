import { ID, IFood, IFoodForm, IList } from "../types";
import { request } from "./api-instance";

export async function getFoods(): Promise<IList<IFood>> {
  return (await request.get("/foods")).data;
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
