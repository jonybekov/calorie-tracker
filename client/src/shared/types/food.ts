import { ID } from "./common";

export interface IFood {
  id: ID;
  name: string;
  calorie_value: number;
  price: number;
  user_id: string;
  consumed_at?: string;
}

export interface IGetFoodParams {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export interface IFoodForm {
  name: string;
  caloriesValue: number;
  price: number;
  consumedAt?: string;
}
