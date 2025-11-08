import { Spinner, Center, Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center minH="100vh">
      <Box>
        <Spinner size="xl" />
      </Box>
    </Center>
  );
}

