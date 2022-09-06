import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  List,
  ScaleFade,
  Spacer,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkBudgetLimit,
  checkCalorieLimit,
  createFood,
  getFoods,
  queryClient,
} from "../shared/api";
import { IFoodForm } from "../shared/types/food";
import { FoodEntry } from "./food-entry";
import { FoodEntryForm } from "../shared/components/food-entry-form";

import { DateRangePicker, FocusedInputShape } from "react-dates";
import { useState } from "react";
import { Moment } from "moment";
import { AxiosError } from "axios";
import { ErrorCode, IErrorResponse } from "../shared/types";
import moment from "moment";
import { DailyCalorieAlert } from "./daily-calorie-alert";
import { MonthlyBudgetAlert } from "./monthy-budget-alert";
import { useGlobalContext } from "../app/contexts";

export function FoodEntries() {
  const [isAddOpen, setIsAddOpen] = useBoolean();
  const toast = useToast();
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const { user } = useGlobalContext();

  const retry = (_: unknown, error: AxiosError<IErrorResponse>) => {
    if (error.response?.status === ErrorCode.Unauthorized) {
      return false;
    }
    return true;
  };

  const { isLoading, data } = useQuery(
    [
      "foods",
      {
        startDate: moment(startDate).startOf("day").utc(),
        endDate: moment(endDate).endOf("day").utc(),
      },
    ],
    getFoods,
    {
      retry,
      enabled: true,
    }
  );
  const { data: totalCalories } = useQuery(
    [
      "check_daily_calorie",
      {
        startDate: moment(startDate).startOf("day").utc(),
        endDate: moment(endDate).endOf("day").utc(),
      },
    ],
    checkCalorieLimit,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: monthlyExpenses } = useQuery(
    ["check_monthly_budget"],
    checkBudgetLimit,
    { refetchOnWindowFocus: false }
  );

  const mutation = useMutation(createFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      queryClient.invalidateQueries(["check_daily_calorie"]);
      queryClient.invalidateQueries(["check_monthly_budget"]);
    },
    onError(error: AxiosError<IErrorResponse>) {
      toast({
        title: error.response?.data.message,
        status: "error",
      });
    },
  });

  const handleAdd = (newFood: IFoodForm) => mutation.mutate(newFood);

  return (
    <>
      <Flex align="center" mb="2">
        <Heading fontSize="2xl" color="gray.700">
          Foods
        </Heading>
        <Spacer />
        <Box>
          <DateRangePicker
            startDate={startDate}
            startDateId="start"
            endDateId="end"
            endDate={endDate}
            isDayBlocked={() => false}
            isOutsideRange={(day) => day.isAfter(moment())}
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={setFocusedInput}
          />
        </Box>
      </Flex>
      <DailyCalorieAlert
        calorieLimit={user?.daily_calorie_limit}
        totalCalories={totalCalories}
      />
      <MonthlyBudgetAlert
        budgetLimit={user?.monthly_budget_limit}
        monthlyExpenses={monthlyExpenses}
      />
      <Divider />

      <List my="5" spacing={2}>
        <Box position="relative" zIndex={1} minHeight="67.2px">
          {!isAddOpen && (
            <Button
              width="full"
              bgColor="gray.100"
              border="2px dashed"
              borderRadius="lg"
              borderColor="gray.500"
              color="gray.500"
              p="8"
              onClick={setIsAddOpen.on}
            >
              <PlusSquareIcon fontSize="xl" mr="2" /> Add Food
            </Button>
          )}

          <ScaleFade in={isAddOpen} reverse={false} unmountOnExit>
            <FoodEntryForm
              isLoading={mutation.isLoading}
              onSubmit={handleAdd}
              onClickOutside={setIsAddOpen.off}
            />
          </ScaleFade>
        </Box>
        {isLoading ? (
          <Center py="10">
            <CircularProgress thickness="4px" isIndeterminate />
          </Center>
        ) : (
          data?.data.map((item) => <FoodEntry key={item.id} data={item} />)
        )}
      </List>
    </>
  );
}
