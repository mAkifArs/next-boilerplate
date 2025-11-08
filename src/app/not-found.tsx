import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="stretch" maxW="2xl" mx="auto" textAlign="center">
        <Heading as="h1" size="2xl">
          404
        </Heading>
        <Heading as="h2" size="lg">
          Page Not Found
        </Heading>
        <Text color="gray.600">
          The page you are looking for does not exist.
        </Text>
        <Box>
          <Link href="/">
            <Button colorScheme="blue">Go Home</Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}

