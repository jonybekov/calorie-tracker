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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../app/contexts/global.context";
import { isAuthenticated } from "../shared/helpers";
import { UserSettingsForm } from "./user-settings-form";

export const Header = () => {
  const { user, isLoading } = useGlobalContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

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
          <Avatar
            transition="ease-in-out"
            _hover={{ boxShadow: "avatar" }}
            onClick={onOpen}
            cursor="pointer"
            src={user?.avatar}
            size="lg"
          />
        )}

        <Modal isOpen={isOpen} isCentered onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <UserSettingsForm onClose={onClose} />
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
