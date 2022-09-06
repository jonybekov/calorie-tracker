import { Alert, AlertIcon, Text, Tooltip } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGlobalContext } from "../app/contexts";
import { isToday } from "../shared/helpers";
import { MonthlyExpensesResult } from "../shared/types";
import moment from "moment";

interface IProps {
  budgetLimit?: number;
  monthlyExpenses?: MonthlyExpensesResult[];
}

export function MonthlyBudgetAlert({ budgetLimit, monthlyExpenses }: IProps) {
  const isWarningVisible = monthlyExpenses?.some((item) => item.is_exceeded);

  const exceededDays = useMemo(() => {
    if (!monthlyExpenses?.length) return;

    return monthlyExpenses
      .filter((item) => item.is_exceeded)
      .map((item) => moment(item.consumed_at).format("MMMM"))
      .join(", ");
  }, [monthlyExpenses]);

  if (!isWarningVisible) return null;

  return (
    <Alert borderRadius="lg" status="warning" mb="2">
      <AlertIcon />
      You reached your monthly budget limit of{" "}
      <Text as="span" mx="1" fontWeight="bold">
        ${budgetLimit}
      </Text>
      for
      <Text as="span" mx="1" fontWeight="bold">
        {exceededDays}
      </Text>
    </Alert>
  );
}
