import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { GENERIC_ERROR_MESSAGE } from "../helpers";
import { FormMode, ID, IFood, IFoodForm } from "../types";

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
  const toast = useToast();

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
      if (!formValues.name || !formValues.caloriesValue || !formValues.price) {
        setErrors({
          ...(!formValues.name && { name: "Food name must be entered" }),
          ...(!formValues.caloriesValue && {
            calorie_value: "Calories name must be entered",
          }),
          ...(!formValues.price && {
            price: "Price must be greater than zero",
          }),
        });
        reject(false);
      } else {
        setErrors({});
        resolve(true);
      }
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await validate();

    try {
      reset();
      onSubmit(formValues as IFoodForm);
    } catch (err) {
      toast({
        title: GENERIC_ERROR_MESSAGE,
        status: "error",
      });
    }
  };

  return {
    handleSubmit,
    formValues,
    setFormValues,
    errors,
  };
};
