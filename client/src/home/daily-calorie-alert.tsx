import { Alert, AlertIcon, Text, Tooltip } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGlobalContext } from "../app/contexts";
import { isToday } from "../shared/helpers";
import { DailyCaloriesResult } from "../shared/types";
import moment from "moment";

interface IProps {
  calorieLimit?: number;
  totalCalories?: DailyCaloriesResult[];
}

export function DailyCalorieAlert({ calorieLimit, totalCalories }: IProps) {
  const isWarningVisible = totalCalories?.some((item) => item.is_exceeded);

  const exceededDays = useMemo(() => {
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
      .map((item) => moment(item.consumed_at).format("MMMM D"))
      .join(", ");
  }, [totalCalories]);

  if (!isWarningVisible) return null;

  return (
    <Alert borderRadius="lg" status="warning" mb="2" display="block" pl="12">
      <AlertIcon height="full" position="absolute" top="0" left="4" />
      You reached your daily calorie limit of
      <Text as="span" mx="1" fontWeight="bold">
        {calorieLimit} kcal
      </Text>
      for
      <Text as="span" mx="1" fontWeight="bold">
        {exceededDays}
      </Text>
    </Alert>
  );
}
