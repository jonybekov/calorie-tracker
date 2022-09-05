import {
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IStatistics } from "../shared/types";
import { ReactComponent as Increase } from "../assets/increase.svg";

const IncreaseIcon = chakra(Increase);

interface IProps {
  data?: IStatistics;
}

export function Stats({ data }: IProps) {
  const { last_week = 0, before_last_week = 0 } = data || {};

  const change = Math.floor(last_week - before_last_week / last_week) * 100;
  const hasIncreased = last_week > before_last_week ? true : false;
  const color = hasIncreased ? "green.500" : "red.500";

  return (
    <Flex
      justify="space-between"
      border="1px"
      borderColor="gray.300"
      borderRadius="lg"
      p="4"
    >
      <Box>
        <Heading
          textTransform="uppercase"
          mb="2"
          fontSize="sm"
          color="gray.500"
        >
          Food entries
        </Heading>
        <HStack spacing={5} mb="4">
          <HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {data?.last_week}
            </Text>
            <Text color="gray.500">This week</Text>
          </HStack>
          <HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {data?.before_last_week}
            </Text>
            <Text color="gray.500">Last week</Text>
          </HStack>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          <Text as="span" color={color} fontWeight="semibold">
            {!hasIncreased && "-"}
            {change}%
          </Text>{" "}
          {hasIncreased ? "increase" : "decrease"} compared to last week
        </Text>
      </Box>
      <Box>
        <Box width="12" bgColor="gray.100" borderRadius="lg" p="2.5">
          <IncreaseIcon color={color} />
        </Box>
      </Box>
    </Flex>
  );
}
