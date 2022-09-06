import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getUserFoods,
  getUser,
  createUserFood,
  queryClient,
  updateUserFood,
  deleteUserFood,
  createRandomFoods,
} from "../shared/api";
import { FoodsTable } from "./foods-table";
import { ReactComponent as PlusIcon } from "../shared/assets/plus.svg";
import { FoodEntryForm } from "../shared/components";
import { useState } from "react";
import {
  FormMode,
  IErrorResponse,
  IFood,
  IFoodForm,
  WithID,
} from "../shared/types";
import { AxiosError } from "axios";
import {
  convertFoodEntryToForm,
  GENERIC_ERROR_MESSAGE,
} from "../shared/helpers";

export function UserPage() {
  const { id: userId } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingRow, setEditingRow] = useState<WithID<IFoodForm> | null>(null);
  const toast = useToast();

  if (!userId) return null;

  const { data: userInfo } = useQuery(["user", userId], getUser);
  const { data: userFoods } = useQuery(["user-foods", userId], getUserFoods);

  const onSuccess = (message: string) => () => {
    queryClient.invalidateQueries(["user-foods"]);
    onClose();
    setEditingRow(null);
    toast({
      title: message,
      status: "success",
    });
  };

  const onError = (error: AxiosError<IErrorResponse>) => {
    toast({
      title: error.response?.data.message || GENERIC_ERROR_MESSAGE,
      status: "error",
    });
  };

  const createMutation = useMutation(createUserFood, {
    onSuccess: onSuccess("Entry successfully added"),
    onError,
  });

  const updateMutation = useMutation(updateUserFood, {
    onSuccess: onSuccess("Entry successfully updated"),
    onError,
  });

  const deleteMutation = useMutation(deleteUserFood, {
    onSuccess: onSuccess("Entry successfully deleted"),
  });

  const randomMutation = useMutation(createRandomFoods, {
    onSuccess: onSuccess("10 random food entries added successfully"),
  });

  const handleSubmit = (formValues: IFoodForm) => {
    if (formMode === "create") {
      createMutation.mutate({ userId: Number(userId), ...formValues });
    } else if (formMode === "edit") {
      updateMutation.mutate({
        userId: Number(userId),
        foodId: editingRow?.id,
        ...formValues,
      });
    }
  };

  const onDelete = ({ id: foodId }: IFood) => {
    deleteMutation.mutate({ userId: Number(userId), foodId });
  };

  const { id: foodId, ...editingRowForm } = editingRow || {};

  return (
    <Box py="4">
      <HStack mb="8">
        <Heading>{userInfo?.first_name}'s Food Entries</Heading>
        <Spacer />
        <Button
          leftIcon={<PlusIcon />}
          onClick={() => {
            setFormMode("create");
            onOpen();
          }}
        >
          Add Food Entry
        </Button>
        <Button
          leftIcon={<PlusIcon />}
          isLoading={randomMutation.isLoading}
          onClick={() => {
            randomMutation.mutate(userId);
          }}
        >
          Add 10 Foods
        </Button>
      </HStack>

      <FoodsTable
        data={userFoods?.data}
        onEdit={(row) => {
          setFormMode("edit");
          setEditingRow({ id: row.id, ...convertFoodEntryToForm(row) });
          onOpen();
        }}
        onDelete={onDelete}
      />

      <Drawer
        size="sm"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditingRow(null);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {formMode === "edit" ? "Edit" : "Create"}{" "}
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <FoodEntryForm
              isLoading={
                formMode === "edit"
                  ? updateMutation.isLoading
                  : createMutation.isLoading
              }
              initialValues={editingRowForm!}
              mode={formMode}
              consumer="admin"
              onSubmit={handleSubmit}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
