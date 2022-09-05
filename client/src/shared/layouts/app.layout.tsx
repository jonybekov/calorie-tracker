import { Center, CircularProgress, Container, Fade } from "@chakra-ui/react";
import React from "react";
import { useGlobalContext } from "../../app/contexts/global.context";

export function AppLayout({ children }: React.PropsWithChildren) {
  const { isLoading } = useGlobalContext();

  return (
    <>
      {isLoading ? (
        <Center py="10" height="100vh">
          <CircularProgress thickness="4px" isIndeterminate />
        </Center>
      ) : (
        <Fade in={!isLoading}>{children}</Fade>
      )}
    </>
  );
}
