import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { register as signUp } from "../shared/api";
import { AuthLayout } from "../shared/layouts";
import { IRegisterForm } from "../shared/types";

export function RegisterPage() {
  const {
    watch,
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<IRegisterForm>();

  const navigate = useNavigate();

  const mutation = useMutation(["register"], signUp, {
    onSuccess(data) {
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    },
    onError(error: any) {
      setError("login", { message: error.response.data.message });
    },
  });

  const onSubmit = (formValues: IRegisterForm) => {
    mutation.mutate(formValues);
  };

  const borderColor = (isInvalid?: boolean) =>
    isInvalid ? "red.500" : undefined;

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormControl isRequired isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input {...register("firstName", { required: true })} />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input {...register("lastName")} />
          </FormControl>
          <FormControl isRequired pt="4" isInvalid={!!errors.login}>
            <FormLabel>Login</FormLabel>
            <Input {...register("login", { required: true })} />
            <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              {...register("password", { required: true })}
              type="password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              focusBorderColor={borderColor(!!errors.confirmPassword)}
              {...register("confirmPassword", {
                required: true,
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              type="password"
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Box py="4" width="full">
            <Button
              width="full"
              isLoading={mutation.isLoading}
              colorScheme="purple"
              type="submit"
            >
              Create an account
            </Button>
            <Text textAlign="center" color="gray.500" mt="2" fontSize="sm">
              Already have an account?{" "}
              <RouterLink to="/login">
                <Button variant="link" fontSize="sm">
                  Sign in
                </Button>
              </RouterLink>
            </Text>
          </Box>
        </VStack>
      </form>
    </AuthLayout>
  );
}
