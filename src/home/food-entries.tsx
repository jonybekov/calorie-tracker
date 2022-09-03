import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
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
import { FoodEntryForm } from "./food-entry-form";

import { DateRangePicker, FocusedInputShape } from "react-dates";
import { useState } from "react";
import { Moment } from "moment";
import { AxiosError } from "axios";
import { ErrorCode, IErrorResponse } from "../shared/types";
import { isAuthenticated } from "../shared/helpers";
import { useGlobalContext } from "../app/contexts/global.context";

export function FoodEntries() {
  const { user } = useGlobalContext();
  const { isLoading, data } = useQuery(["foods"], getFoods, {
    retry(_, error: AxiosError<IErrorResponse>) {
      if (error.response?.status === ErrorCode.Unauthorized) {
        return false;
      }
      return true;
    },
  });
  const { data: calorieLimit } = useQuery(
    ["check_daily_calorie"],
    checkCalorieLimit
  );

  const [isAddOpen, setIsAddOpen] = useBoolean();
  const toast = useToast();
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

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

  const handleAdd = (newFood: IFoodForm) => {
    mutation.mutate(newFood);
  };

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
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={setFocusedInput}
          />
        </Box>
      </Flex>
      {calorieLimit?.is_exceeded && (
        <Alert borderRadius="lg" status="warning" mb="2">
          <AlertIcon />
          You reached your daily calorie limit of {
            user?.daily_calorie_limit
          }{" "}
          kcal
        </Alert>
      )}
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
