import {
  useNumberInput,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  UseNumberInputProps,
} from "@chakra-ui/react";

export function MobileSpinner(props: UseNumberInputProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 10,
      defaultValue: 0,
      min: 0,
      ...props,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <FormControl>
      <FormLabel>Est calories</FormLabel>
      <HStack maxW="320px">
        <Button {...inc}>+</Button>
        <Input {...input} />
        <Button {...dec}>-</Button>
      </HStack>
    </FormControl>
  );
}
