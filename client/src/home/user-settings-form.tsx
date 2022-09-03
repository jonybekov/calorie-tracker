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
  ModalCloseButton,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  HStack,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../app/contexts/global.context";
import { queryClient, updateMe } from "../shared/api";
import { formatPrice, normalizePrice } from "../shared/helpers";
import { IErrorResponse, IUser } from "../shared/types";

interface IProps {
  onClose?: () => void;
}

export const UserSettingsForm = ({ onClose }: IProps) => {
  const { user } = useGlobalContext();
  const toast = useToast();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IUser>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      avatar: user?.avatar,
      monthly_budget_limit: user?.monthly_budget_limit,
      daily_calorie_limit: user?.daily_calorie_limit,
    },
  });

  const mutation = useMutation(["user"], updateMe, {
    onSuccess() {
      queryClient.invalidateQueries(["me"]);
      queryClient.invalidateQueries(["check_daily_calorie"]);

      onClose?.();
      toast({
        title: "User settings updated successfully",
        status: "success",
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      toast({
        title: error.response?.data?.message,
        status: "error",
      });
    },
  });

  const onSubmit = ({
    monthly_budget_limit,
    daily_calorie_limit,
    ...formValues
  }: IUser) => {
    mutation.mutate({
      ...formValues,
      monthly_budget_limit: normalizePrice(monthly_budget_limit),
      daily_calorie_limit: normalizePrice(daily_calorie_limit),
    });
  };

  return (
    <>
      <ModalCloseButton />
      <ModalHeader>User settings</ModalHeader>
      <ModalBody>
        <form id="user-settings" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <HStack width="full" spacing={4} mb="2">
              <Avatar size="lg" src={watch("avatar")} />
              <FormControl>
                <FormLabel mb="1">Avatar URL</FormLabel>
                <Input {...register("avatar")} />
              </FormControl>
            </HStack>
            <FormControl isRequired isInvalid={!!errors.first_name}>
              <FormLabel>First Name</FormLabel>
              <Input {...register("first_name", { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input {...register("last_name")} />
            </FormControl>
            <FormControl>
              <FormLabel>Monthly budget limit</FormLabel>
              <NumberInput
                step={50}
                format={formatPrice}
                {...register("monthly_budget_limit")}
                min={0}
                max={Infinity}
                onChange={(_, valueAsNumber) => {
                  setValue("monthly_budget_limit", valueAsNumber);
                }}
              >
                <NumberInputField name="monthly_budget_limit" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Daily calorie limit</FormLabel>
              <NumberInput
                format={formatPrice}
                {...register("daily_calorie_limit")}
                min={0}
                max={Infinity}
                onChange={(_, valueAsNumber) =>
                  setValue("daily_calorie_limit", valueAsNumber)
                }
              >
                <NumberInputField name="daily_calorie_limit" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
        </form>
      </ModalBody>
      <ModalFooter gap="2">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="solid"
          isLoading={mutation.isLoading}
          isDisabled={!isDirty}
          colorScheme="green"
          form="user-settings"
          type="submit"
        >
          Save
        </Button>
      </ModalFooter>
    </>
  );
};
