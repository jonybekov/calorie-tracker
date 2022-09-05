import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
  Text,
  Flex,
} from "@chakra-ui/react";

interface IProps extends Omit<ModalProps, "children"> {
  onConfirm?: () => void;
}

export function ConfirmationModal({ onConfirm, ...modalProps }: IProps) {
  return (
    <Modal isCentered {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pt="10" pb="5" textAlign="center">
          <Text fontWeight="semibold" fontSize="xl">
            Are you sure?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Flex gap="3" width="full">
            <Button width="full" onClick={modalProps.onClose}>
              Cancel
            </Button>
            <Button width="full" colorScheme="red" onClick={onConfirm}>
              Confirm
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
