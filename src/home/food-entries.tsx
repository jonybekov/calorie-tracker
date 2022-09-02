import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  ScaleFade,
  Spacer,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFood, getFoods, queryClient } from "../shared/api";
import { IFood, IFoodForm } from "../shared/types/food";
import { FoodEntry } from "./food-entry";
import { FoodEntryForm } from "./food-entry-form";

export function FoodEntries() {
  const { isLoading, data, isError } = useQuery(["foods"], getFoods);
  const [isAddOpen, setIsAddOpen] = useBoolean();
  const toast = useToast();

  const mutation = useMutation(createFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
    },
    onError(error, variables, context) {
      toast({
        title: "Error occured",
        status: "error",
      });
    },
  });

  const handleAdd = (newFood: IFoodForm) => {
    mutation.mutate(newFood);
  };

  return (
    <>
      <Heading fontSize="2xl" mb="2" color="gray.700">
        Foods
      </Heading>
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
