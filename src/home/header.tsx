import {
  Avatar,
  Box,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useGlobalContext } from "../app/contexts/global.context";
import { UserSettingsForm } from "./user-settings-form";

export const Header = () => {
  const { user } = useGlobalContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex align="center" justify="space-between" mb="10">
      <Box>
        <Heading color="gray.400">Hello,</Heading>
        <Heading>{user?.first_name}</Heading>
      </Box>
      <Avatar onClick={onOpen} size="lg" />
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <UserSettingsForm />
        </ModalContent>
      </Modal>
    </Flex>
  );
};
