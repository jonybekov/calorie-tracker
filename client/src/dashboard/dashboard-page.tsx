import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Brush,
} from "recharts";
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
      <Box height="400px" my="4">
        <Heading mb="4" fontSize="md" fontWeight="semibold">
          Average calories per user
        </Heading>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data?.average_calories_per_user.data}
          >
            <XAxis dataKey="first_name" tick={{ fontSize: 12 }} />
            <YAxis tickSize={10} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="average_calories"
              name="Average calories"
              fill="#82ca9d"
            />
            <Brush
              dataKey="first_name"
              height={30}
              stroke="#8884d8"
              endIndex={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
