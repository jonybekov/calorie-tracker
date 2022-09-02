import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Input,
  VStack,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../app/contexts/global.context";
import { formatPrice } from "../shared/helpers";
import { IUser } from "../shared/types";

export const UserSettingsForm = () => {
  const { user } = useGlobalContext();
  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit = () => {
    console.log("form");
  };

  return (
    <>
      <ModalHeader>User preferences</ModalHeader>
      <ModalBody>
        <form id="user-settings" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                {...register("first_name", { required: true })}
                defaultValue={user?.first_name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("first_name")}
                defaultValue={user?.last_name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Monthly budget limit</FormLabel>
              <NumberInput
                format={formatPrice}
                defaultValue={user?.monthly_budget_limit}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Daily calorie limit</FormLabel>
              <NumberInput
                format={formatPrice}
                defaultValue={user?.daily_calorie_limit}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </VStack>
        </form>
      </ModalBody>
      <ModalFooter gap="2">
        <Button>Cancel</Button>
        <Button
          variant="solid"
          //   isLoading={mutation.isLoading}
          colorScheme="green"
          form="user-settings"
        >
          Save
        </Button>
      </ModalFooter>
    </>
  );
};
