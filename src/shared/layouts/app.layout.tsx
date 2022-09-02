import { Container } from "@chakra-ui/react";
import React from "react";

export function AppLayout({ children }: React.PropsWithChildren) {
  return <Container maxW="container.sm">{children}</Container>;
}
