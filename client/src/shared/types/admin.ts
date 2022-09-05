import { ID } from "./common";

export interface IStatistics {
  last_week: number;
  before_last_week: number;
  average_calories_per_user: {
    count: number;
    data: {
      user_id: ID;
      first_name: string;
      last_name: string;
      average_calories: number;
    }[];
  };
}

export interface IFoodFormParams {
  userId?: ID;
  foodId?: ID;
}
