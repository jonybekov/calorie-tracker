import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Fade,
  IconButton,
  ListItem,
  Spacer,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { deleteFood, queryClient, updateFood } from "../shared/api";
import { IFood, IFoodForm } from "../shared/types/food";
import { FoodEntryForm } from "../shared/components/food-entry-form";
import { convertFoodEntryToForm } from "../shared/helpers";
import moment from "moment";

interface IProps {
  data: IFood;
}

export function FoodEntry({ data }: IProps) {
  const toast = useToast();
  const [isUpdateOpen, setIsUpdateOpen] = useBoolean();
  const dataAsFormValues = convertFoodEntryToForm(data);

  const deleteMutation = useMutation(deleteFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      queryClient.invalidateQueries(["check_daily_calorie"]);
      queryClient.invalidateQueries(["check_monthly_budget"]);
    },
    onError() {
      toast({
        title: "Error occured",
        status: "error",
      });
    },
  });

  const updateMutation = useMutation(updateFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      queryClient.invalidateQueries(["check_daily_calorie"]);
      queryClient.invalidateQueries(["check_monthly_budget"]);
    },
    onError() {
      toast({
        title: "Error occured",
        status: "error",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(data.id);
  };

  const handleUpdate = (formData: IFoodForm) => {
    updateMutation.mutate({ id: data.id, ...formData });
    setIsUpdateOpen.off();
  };

  return (
    <>
      <ListItem
        position="relative"
        display="flex"
        alignItems="center"
        boxShadow="sm"
        px="4"
        py="2"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
      >
        <Text fontSize="lg" fontWeight="medium">
          {data.name}
        </Text>
        <Text fontSize="sm" color="gray.500" ml="2" fontWeight="medium">
          {data.calorie_value} kcal, ${data.price}
        </Text>
        <Spacer />
        <Text fontSize="sm" color="gray.500" mr="3" fontWeight="medium">
          {moment(data.consumed_at).format("HH:mm")}
        </Text>

        <IconButton
          aria-label="edit"
          colorScheme="gray"
          variant="ghost"
          onClick={setIsUpdateOpen.on}
        >
          <EditIcon color="gray.500" />
        </IconButton>
        <IconButton
          aria-label="delete"
          colorScheme="red"
          variant="ghost"
          onClick={handleDelete}
        >
          <DeleteIcon color="red.500" />
        </IconButton>

        <Fade in={isUpdateOpen} style={{ zIndex: 99 }} unmountOnExit>
          <FoodEntryForm
            mode="edit"
            initialValues={dataAsFormValues}
            isLoading={updateMutation.isLoading}
            onSubmit={handleUpdate}
            onClickOutside={setIsUpdateOpen.off}
          />
        </Fade>
      </ListItem>
    </>
  );
}
