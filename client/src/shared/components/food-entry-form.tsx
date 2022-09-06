import {
  Box,
  Button,
  ChakraProps,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "../../app/contexts/global.context";
import { formatPrice } from "../helpers";
import { UseFoodEntryForm, useFoodEntryForm } from "../hooks";
import { MobileSpinner } from "./mobile-spinner";

interface IProps extends UseFoodEntryForm {
  isLoading?: boolean;
  consumer?: "admin" | "user";
  onClickOutside?: () => void;
}

export function FoodEntryForm({
  isLoading,
  consumer = "user",
  onClickOutside,
  ...props
}: IProps) {
  const { user } = useGlobalContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const { handleSubmit, formValues, setFormValues } = useFoodEntryForm(props);

  const wrapperStyles: ChakraProps = {
    position: "absolute",
    top: props.mode === "edit" ? "60px" : "0",
    left: "0",
    zIndex: 1000,
    width: "full",
    bgColor: "white",
  };

  useOutsideClick({
    ref: ref,
    handler: onClickOutside,
  });

  useEffect(() => {
    if (consumer !== "admin") {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  return (
    <Box ref={ref} {...(consumer === "admin" ? undefined : wrapperStyles)}>
      <Box
        as="form"
        onSubmit={handleSubmit}
        boxShadow={consumer !== "admin" ? "lg" : "none"}
        borderRadius="lg"
        border={consumer !== "admin" ? "1px" : "none"}
        borderColor="gray.200"
      >
        <Box padding={consumer !== "admin" ? "4" : "none"}>
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
            max={user?.daily_calorie_limit}
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

        <Flex
          gap="2"
          mt={consumer !== "admin" ? "2" : "10"}
          padding={consumer !== "admin" ? "4" : "none"}
          bgColor={consumer !== "admin" ? "blackAlpha.50" : "none"}
        >
          {consumer !== "admin" && (
            <Button variant="outline" colorScheme="gray">
              Clear
            </Button>
          )}
          <Button
            variant="solid"
            colorScheme="green"
            width={consumer !== "admin" ? "auto" : "full"}
            isLoading={isLoading}
            type="submit"
          >
            {props.mode === "edit" ? "Update" : "Save"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
