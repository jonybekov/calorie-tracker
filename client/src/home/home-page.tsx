import { Container } from "@chakra-ui/react";
import { FoodEntries } from "./food-entries";
import { Header } from "./header";

export const HomePage = () => {
  return (
    <Container maxW="container.sm">
      <Header />
      <FoodEntries />
    </Container>
  );
};
