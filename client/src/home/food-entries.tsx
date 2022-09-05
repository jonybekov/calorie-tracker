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
import { useGlobalContext } from "../app/contexts/global.context";
import moment from "moment";
import { DailyCalorieAlert } from "./daily-calorie-alert";

export function FoodEntries() {
  const [isAddOpen, setIsAddOpen] = useBoolean();
  const toast = useToast();
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const retry = (_: unknown, error: AxiosError<IErrorResponse>) => {
    if (error.response?.status === ErrorCode.Unauthorized) {
      return false;
    }
    return true;
  };

  const { isLoading, data } = useQuery(
    ["foods", { startDate, endDate }],
    getFoods,
    {
      retry,
      enabled: true,
    }
  );
  const { data: totalCalories } = useQuery(
    ["check_daily_calorie", { startDate, endDate }],
    checkCalorieLimit
  );

  const isWarningVisible = totalCalories?.some((item) => item.is_exceeded);

  const mutation = useMutation(createFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      queryClient.invalidateQueries(["check_daily_calorie"]);
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
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(moment(startDate).startOf("day").utc());
              setEndDate(moment(endDate).endOf("day").utc());
            }}
            focusedInput={focusedInput}
            onFocusChange={setFocusedInput}
          />
        </Box>
      </Flex>
      {isWarningVisible && <DailyCalorieAlert totalCalories={totalCalories} />}
      <Divider />

      <List my="5" spacing={2}>
        {isLoading ? (
          <Center py="10">
            <CircularProgress thickness="4px" isIndeterminate />
          </Center>
        ) : (
          data?.data.map((item) => <FoodEntry key={item.id} data={item} />)
        )}
        <Box position="relative">
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
      </List>
    </>
  );
}
