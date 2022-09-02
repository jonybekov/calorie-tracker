import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../shared/helpers";
import { IFood, IFoodForm } from "../shared/types/food";
import { MobileSpinner } from "./mobile-spinner";

interface IProps {
  isLoading?: boolean;
  initialValues?: Partial<IFoodForm>;
  onSubmit: (value: IFoodForm) => void | Promise<void>;
  onClickOutside?: () => void;
  mode?: "edit" | "create";
}

type Errors = Partial<Record<keyof IFood, string>>;

export function FoodEntryForm({
  isLoading,
  onSubmit,
  initialValues = {},
  onClickOutside,
  mode = "create",
}: IProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: ref,
    handler: onClickOutside,
  });

  const [formValues, setFormValues] =
    useState<Partial<IFoodForm>>(initialValues);
  const [errors, setErrors] = useState<Errors>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

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

  return (
    <Box
      ref={ref}
      position="absolute"
      top={mode === "edit" ? "60px" : "0"}
      left="0"
      zIndex="1000"
      width="full"
      bgColor="white"
      pb="10"
    >
      <Box boxShadow="md" borderRadius="lg" border="1px" borderColor="gray.200">
        <Box p="4">
          <Input
            autoFocus
            fontSize="2xl"
            fontWeight="semibold"
            value={formValues.name}
            onChange={({ target }) =>
              setFormValues((val) => ({ ...val, name: target.value }))
            }
            variant="unstyled"
            mb="4"
            placeholder="Food name here..."
          />
          <MobileSpinner
            value={formValues.caloriesValue}
            onChange={(_, value) => {
              setFormValues((val) => ({
                ...val,
                caloriesValue: Number.isNaN(value) ? 0 : value,
              }));
            }}
          />
          <FormControl mt="4">
            <FormLabel>Price</FormLabel>
            <NumberInput
              format={formatPrice}
              value={formValues.price}
              onChange={(_, value) => {
                setFormValues((val) => ({
                  ...val,
                  price: Number.isNaN(value) ? 0 : value,
                }));
              }}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </Box>

        <Flex gap="2" p="4" bgColor="blackAlpha.50">
          <Button variant="outline" colorScheme="gray">
            Clear
          </Button>
          <Button
            variant="solid"
            colorScheme="green"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            {mode === "edit" ? "Update" : "Save"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
