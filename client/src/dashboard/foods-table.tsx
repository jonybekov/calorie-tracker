import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";

import { ReactComponent as DotsIcon } from "../shared/assets/dots.svg";
import { IFood } from "../shared/types";
import { formatPrice } from "../shared/helpers";
import { ConfirmationModal } from "../shared/components";
import { useState } from "react";

interface IProps {
  data?: IFood[];
  onEdit?: (row: IFood) => void | Promise<void>;
  onDelete?: (row: IFood) => void | Promise<void>;
}

export function FoodsTable({ data, onDelete, onEdit }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selected, setSelected] = useState<IFood | null>(null);

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th whiteSpace="nowrap">Name</Th>
            <Th whiteSpace="nowrap">Date</Th>
            <Th whiteSpace="nowrap">Calorie Amount</Th>
            <Th whiteSpace="nowrap">Price</Th>
            <Th whiteSpace="nowrap">Actions</Th>
          </Tr>
        </Thead>
        <Tbody color="gray.700">
          {data?.map((row) => (
            <Tr key={row.id}>
              <Td>{row.name}</Td>
              <Td>{moment(row.consumed_at).format("DD-MM-YYYY")}</Td>
              <Td>{row.calorie_value} kcal</Td>
              <Td>${formatPrice(row.price)}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    color="gray.600"
                    aria-label="actions"
                    variant="outline"
                    icon={<DotsIcon />}
                  />

                  <MenuList px="2" borderRadius="xl">
                    <MenuItem
                      borderRadius="lg"
                      p="3"
                      onClick={() => {
                        onEdit?.(row);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSelected(row);
                        onOpen();
                      }}
                      color="red.500"
                      _hover={{ bgColor: "red.50" }}
                      borderRadius="lg"
                      p="3"
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          selected && onDelete?.(selected);
          setSelected(null);
          onClose();
        }}
      />
    </>
  );
}
