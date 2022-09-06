import { ID } from "./common";

export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export interface IUser {
  id: ID;
  first_name: string;
  last_name?: string;
  avatar?: string;
  monthly_budget_limit?: number;
  daily_calorie_limit?: number;
  login?: string;
  created_at?: string;
  modified_at?: string;
  role: Role;
}

export type DailyCaloriesResult = {
  id: ID;
  first_name: string;
  consumed_at: string;
  daily_calories: string;
  is_exceeded: boolean;
};

export type MonthlyExpensesResult = {
  id: ID;
  first_name: string;
  consumed_at: string;
  total_price: string;
  is_exceeded: boolean;
};
