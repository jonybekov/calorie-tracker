import { Center, Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function AccessDenied() {
  return (
    <Box>
      <Center>
        <Box>
          <Heading mb="5">403</Heading>
          <Heading mb="5">Access Denied</Heading>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Box>
      </Center>
    </Box>
  );
}
