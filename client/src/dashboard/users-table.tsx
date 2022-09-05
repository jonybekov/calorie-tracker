import {
  Avatar,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getUsers } from "../shared/api/admin";

import { ReactComponent as DotsIcon } from "../shared/assets/dots.svg";
import { Link } from "react-router-dom";

export function UsersTable() {
  const { isLoading, isError, data } = useQuery(["users"], getUsers);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th whiteSpace="nowrap">User</Th>
          <Th whiteSpace="nowrap">Registered At</Th>
          <Th whiteSpace="nowrap">Status</Th>
          <Th whiteSpace="nowrap">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.data?.map((row) => (
          <Tr key={row.id}>
            <Td>
              <HStack>
                <Avatar src={row.avatar} mr="2" />
                <VStack align="flex-start" spacing={0}>
                  <Text>
                    {row.first_name} {row.last_name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    @{row.login}
                  </Text>
                </VStack>
              </HStack>
            </Td>
            <Td>{moment(row.created_at).format("DD-MM-YYYY")}</Td>
            <Td>
              <Badge colorScheme="blue">Active</Badge>
            </Td>
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
                    <Link to={`/dashboard/users/${row.id}`}>Show Entries</Link>
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
