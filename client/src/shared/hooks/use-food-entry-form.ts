import { useState } from "react";
import { FormMode, IFood, IFoodForm } from "../types";

type Errors = Partial<Record<keyof IFood, string>>;

export interface UseFoodEntryForm {
  onSubmit: (value: IFoodForm) => void | Promise<void>;
  initialValues?: Partial<IFoodForm>;
  mode?: FormMode;
}

export const useFoodEntryForm = ({
  mode = "create",
  initialValues,
  onSubmit,
}: UseFoodEntryForm) => {
  const [formValues, setFormValues] = useState<Partial<IFoodForm>>(
    initialValues ?? {}
  );
  const [errors, setErrors] = useState<Errors>();

  const reset = () => {
    if (mode === "create") {
      setFormValues({
        name: "",
        caloriesValue: 0,
        price: 0,
      });
    }
  };

  const validate = async () => {
    return new Promise((resolve, reject) => {
      if (!formValues.name || !formValues.caloriesValue) {
        setErrors({
          ...(!formValues.name && { name: "Food name must be entered" }),
          ...(!formValues.caloriesValue && {
            calories: "Calories name must be entered",
          }),
        });
        reject(false);
      } else {
        setErrors({});
        resolve(true);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await validate();

      reset();
      onSubmit(formValues as IFoodForm);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleSubmit,
    formValues,
    setFormValues,
  };
};