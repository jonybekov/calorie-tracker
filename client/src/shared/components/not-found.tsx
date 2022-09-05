import { Center, Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Box>
      <Center>
        <Box>
          <Heading mb="5">404</Heading>
          <Heading mb="5">Page Not Found</Heading>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Box>
      </Center>
    </Box>
  );
}
