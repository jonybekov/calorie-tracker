import { ID } from "./common";

export interface IUser {
  id: ID;
  first_name: string;
  last_name?: string;
  avatar?: string;
  monthly_budget_limit?: number;
  daily_calorie_limit?: number;
}

export type DailyCaloriesResult = {
  id: ID;
  first_name: string;
  consumed_at: string;
  daily_calories: string;
  is_exceeded: boolean;
};
