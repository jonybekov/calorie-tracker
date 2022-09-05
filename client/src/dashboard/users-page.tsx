import { Box, Heading } from "@chakra-ui/react";
import { UsersTable } from "./users-table";

export function UsersPage() {
  return (
    <Box py="4">
      <Heading mb="8">Users</Heading>
      <UsersTable />
    </Box>
  );
}
