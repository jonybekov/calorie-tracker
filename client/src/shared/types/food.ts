export interface IFood {
  id: string;
  name: string;
  calorie_value: number;
  price: number;
  user_id: string;
  consumed_at?: string;
}

export interface IFoodForm {
  name: string;
  caloriesValue: number;
  price: number;
  consumedAt?: string;
}
