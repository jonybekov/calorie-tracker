import {
  Alert,
  Avatar,
  Box,
  Button,
  Text,
  CloseButton,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../app/contexts";
import { queryClient } from "../shared/api";
import { isAuthenticated } from "../shared/helpers";
import { Role } from "../shared/types";
import { UserSettingsForm } from "./user-settings-form";

export const Header = () => {
  const { user, isLoading } = useGlobalContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const logOut = () => {
    localStorage.removeItem("access_token");
    queryClient.invalidateQueries(["me"]);
    location.reload();
  };

  return (
    <VStack mb="10" align="flex-start" spacing={4}>
      <Flex align="center" justify="space-between" width="full">
        <Box pt="4">
          <Heading color="gray.400">Hello,</Heading>
          <Heading>{user?.first_name || "Anonymous"}</Heading>
        </Box>

        {!user && !isLoading ? (
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        ) : (
          <Menu>
            <MenuButton color="gray.600" aria-label="actions">
              <Avatar
                transition="ease-in-out"
                _hover={{ boxShadow: "avatar" }}
                cursor="pointer"
                src={user?.avatar}
                size="lg"
              />
            </MenuButton>

            <MenuList px="2" borderRadius="xl" zIndex="99">
              {user?.role === Role.Admin && (
                <MenuItem
                  as={Link}
                  to="/dashboard"
                  fontWeight="medium"
                  borderRadius="lg"
                  p="3"
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem
                onClick={onOpen}
                fontWeight="medium"
                borderRadius="lg"
                p="3"
              >
                Settings
              </MenuItem>
              <MenuItem
                onClick={logOut}
                fontWeight="medium"
                borderRadius="lg"
                p="3"
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        <Modal isOpen={isOpen} isCentered onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <UserSettingsForm user={user} onClose={onClose} />
          </ModalContent>
        </Modal>
      </Flex>
      {!isAuthenticated() && (
        <Alert borderRadius="lg" fontWeight="medium" mb="4">
          <Text>Please sign in to save changes</Text>
          <Spacer />
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            onClick={onClose}
          />
        </Alert>
      )}
    </VStack>
  );
};
