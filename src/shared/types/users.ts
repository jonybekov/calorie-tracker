export interface IUser {
  id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  monthly_budget_limit?: number;
  daily_calorie_limit?: number;
}
