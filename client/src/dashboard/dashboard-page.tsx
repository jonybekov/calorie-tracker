import { Box, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../shared/api/admin";
import { Stats } from "./stats";

export function DashboardPage() {
  const { data } = useQuery(["statistics"], getStatistics);

  return (
    <Box>
      <Flex align="center" mb="4" justify="space-between" width="full">
        <Box pt="4" mb="4">
          <Heading>Analytics</Heading>
        </Box>
      </Flex>
      <Stats data={data} />
    </Box>
  );
}
