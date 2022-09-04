import { Alert, AlertIcon, Text, Tooltip } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGlobalContext } from "../app/contexts/global.context";
import { isToday } from "../shared/helpers";
import { DailyCaloriesResult } from "../shared/types";
import moment from "moment";

interface IProps {
  totalCalories?: DailyCaloriesResult[];
}

export function DailyCalorieAlert({ totalCalories }: IProps) {
  const { user } = useGlobalContext();

  const calorieLimitExceededDays = useMemo(() => {
    if (!totalCalories?.length) return;

    if (totalCalories.length === 1 && isToday(totalCalories[0].consumed_at)) {
      return (
        <Tooltip label={moment().format("MMMM D, YYYY")} color="white">
          today
        </Tooltip>
      );
    }

    return totalCalories
      .filter((item) => item.is_exceeded)
      .map((item) => moment(item.consumed_at).format("MMMM D, YY"))
      .join(", ");
  }, [totalCalories]);

  return (
    <Alert borderRadius="lg" status="warning" mb="2">
      <AlertIcon />
      You reached your daily calorie limit of{" "}
      <Text as="span" mx="1" fontWeight="bold">
        {user?.daily_calorie_limit}
      </Text>
      kcal for
      <Text as="span" mx="1" fontWeight="bold">
        {calorieLimitExceededDays}
      </Text>
    </Alert>
  );
}
