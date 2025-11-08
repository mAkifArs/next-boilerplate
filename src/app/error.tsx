"use client";

import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box p={8}>
      <VStack spacing={4} align="stretch" maxW="2xl" mx="auto">
        <Heading as="h2" size="xl">
          Something went wrong!
        </Heading>
        <Text color="red.500">{error.message}</Text>
        <Button onClick={reset} colorScheme="blue">
          Try again
        </Button>
      </VStack>
    </Box>
  );
}

