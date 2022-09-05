import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login, queryClient } from "../shared/api";
import { AuthLayout } from "../shared/layouts";
import { ILoginForm } from "../shared/types";

export function LoginPage() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<ILoginForm>();

  const navigate = useNavigate();

  const mutation = useMutation(["login"], login, {
    onSuccess(data) {
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      queryClient.invalidateQueries(["me"]);
    },
    onError(error: any) {
      setError("login", { message: error.response.data.message });
    },
  });

  const onSubmit = (formValues: ILoginForm) => {
    mutation.mutate(formValues);
  };

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={!!errors.login}>
          <FormLabel>Login</FormLabel>
          <Input {...register("login", { required: true })} />
          <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
          <FormErrorMessage>Wrong input</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="purple"
          mt="4"
          type="submit"
          isLoading={mutation.isLoading}
          width="full"
          py="5"
        >
          Sign In
        </Button>
        <Text color="gray.500" mt="2" textAlign="center" fontSize="sm">
          Don't have an account?{" "}
          <RouterLink to="/register">
            <Button variant="link" fontSize="sm">
              Register
            </Button>
          </RouterLink>
        </Text>
      </form>
    </AuthLayout>
  );
}
