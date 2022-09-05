import { IFood, IFoodForm } from "../types";

export const convertFoodEntryToForm = (data: IFood): IFoodForm => {
  return {
    name: data.name,
    price: data.price || 0,
    consumedAt: data.consumed_at,
    caloriesValue: data.calorie_value || 0,
  };
};
