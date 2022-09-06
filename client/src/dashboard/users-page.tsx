import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { UsersTable } from "./users-table";
import { ReactComponent as PlusIcon } from "../shared/assets/plus.svg";
import { useMutation } from "@tanstack/react-query";
import { createRandomUsers, queryClient } from "../shared/api";

export function UsersPage() {
  const toast = useToast();

  const mutation = useMutation(createRandomUsers, {
    onSuccess() {
      queryClient.invalidateQueries(["users"]);
      toast({
        title: "10 random users added successfully",
        status: "success",
      });
    },
    retry: false,
  });

  return (
    <Box py="4">
      <HStack mb="8">
        <Heading>Users</Heading>
        <Spacer />
        <Button
          leftIcon={<PlusIcon />}
          isLoading={mutation.isLoading}
          onClick={() => {
            mutation.mutate();
          }}
        >
          Add 10 Users
        </Button>
      </HStack>
      <UsersTable />
    </Box>
  );
}
