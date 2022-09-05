import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserFoods, getUser } from "../shared/api";
import { FoodsTable } from "./foods-table";

export function UserPage() {
  const { id: userId } = useParams();

  if (!userId) return null;

  const { data: userInfo } = useQuery(["user", userId], getUser);
  const { data: userFoods } = useQuery(["user-foods", userId], getUserFoods);

  return (
    <Box py="4">
      <Heading mb="8">User</Heading>

      {/* <FoodsTable data={userFoods?.data} /> */}
    </Box>
  );
}
