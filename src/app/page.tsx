import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch" maxW="4xl" mx="auto">
        <Heading as="h1" size="2xl">
          Welcome to Next.js Boilerplate
        </Heading>
        <Text fontSize="lg" color="gray.600">
          A production-ready Next.js boilerplate with TypeScript, Zustand, Chakra UI, and Tailwind
          CSS.
        </Text>
        <Box>
          <Link href="/about">
            <Button colorScheme="blue">Learn More</Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}
