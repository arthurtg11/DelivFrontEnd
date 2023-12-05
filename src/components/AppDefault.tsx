import { AuthContext } from "@/contexts/AuthContext";
import { Button, Flex, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import { ConfigurationContext } from "../contexts/ConfigurationContext";
import { LoadingAction } from "./LoadingAction";

export default function AppDefault({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <ReactNotifications />
      <LoadingAction />
      <Flex>
        {children}
      </Flex>
    </>
  );
}
