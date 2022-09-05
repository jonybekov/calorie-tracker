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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserFoods, getUser } from "../shared/api";
import { FoodsTable } from "./foods-table";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { FoodEntryForm } from "../shared/components";
import { useState } from "react";
import { FormMode, IFood } from "../shared/types";

export function UserPage() {
  const { id: userId } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingRow, setEditingRow] = useState<IFood | null>(null);

  if (!userId) return null;

  const { data: userInfo } = useQuery(["user", userId], getUser);
  const { data: userFoods } = useQuery(["user-foods", userId], getUserFoods);

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
      </HStack>

      <FoodsTable
        data={userFoods?.data}
        onEdit={(row) => {
          setFormMode("edit");
          setEditingRow(row);
          onOpen();
        }}
        onDelete={alert}
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
              initialValues={editingRow as any}
              mode={formMode}
              consumer="admin"
              onSubmit={() => {}}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
