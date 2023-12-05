import { ConfigurationContext } from "@/contexts/ConfigurationContext";
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { useContext } from "react";

export const LoadingAction = () => {
  const { loading, setLoading } = useContext(ConfigurationContext);
  return (
    <Modal isOpen={loading} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <HStack
            h="8rem"
            userSelect="none"
            alignItems="center"
            justifyContent="center"
            bgColor="white"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};