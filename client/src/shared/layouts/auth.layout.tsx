import { Container, Box, Heading } from "@chakra-ui/react";
import React from "react";

interface IProps {
  title: string;
}

export function AuthLayout({
  title,
  children,
}: React.PropsWithChildren<IProps>) {
  return (
    <Container maxW="container.sm">
      <Container maxW="sm">
        <Box py="10">
          <Heading mb="8">{title}</Heading>
          {children}
        </Box>
      </Container>
    </Container>
  );
}
