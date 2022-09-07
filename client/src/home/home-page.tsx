import { Container } from "@chakra-ui/react";
import { isAuthenticated } from "../shared/helpers";
import { FoodEntries } from "./food-entries";
import { Header } from "./header";

export const HomePage = () => {
  return (
    <Container maxW="container.sm">
      <Header />
      {isAuthenticated() && <FoodEntries />}
    </Container>
  );
};
