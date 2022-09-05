import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../app/contexts/global.context";
import { getStatistics } from "../shared/api/admin";
import { Stats } from "./stats";
import { UsersTable } from "./users-table";

export function DashboardPage() {
  const { user } = useGlobalContext();
  const { isLoading, data } = useQuery(["statistics"], getStatistics);

  return (
    <Box>
      <Flex align="center" mb="4" justify="space-between" width="full">
        <Box pt="4" mb="4">
          <Heading color="gray.400">Good Day,</Heading>
          <Heading>{user?.first_name}</Heading>
        </Box>

        <Link to="/login">
          <Button>Logout</Button>
        </Link>
      </Flex>
      <Stats data={data} />
    </Box>
  );
}
