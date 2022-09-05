import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  HStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getUsers } from "../shared/api/admin";

import { ReactComponent as DotsIcon } from "../assets/dots.svg";
import { IFood } from "../shared/types";
import { formatPrice } from "../shared/helpers";

interface IProps {
  data?: IFood[];
}

export function FoodsTable({ data }: IProps) {
  return (
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
      <Tbody>
        {data?.map((row) => (
          <Tr>
            <Td>{row.name}</Td>
            <Td>{moment(row.consumed_at).format("DD-MM-YYYY")}</Td>
            <Td>{row.calorie_value}</Td>
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
                  <MenuItem borderRadius="lg" p="3">
                    Show Entries
                  </MenuItem>
                  <MenuItem
                    color="red.500"
                    _hover={{ bgColor: "red.50" }}
                    borderRadius="lg"
                    p="3"
                  >
                    Deactivate
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
