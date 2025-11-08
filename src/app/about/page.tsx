import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Code,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

interface Library {
  name: string;
  version: string;
  category: "runtime" | "dev";
}

const dependencies: Library[] = [
  { name: "next", version: "^14.2.0", category: "runtime" },
  { name: "react", version: "^18.3.1", category: "runtime" },
  { name: "react-dom", version: "^18.3.1", category: "runtime" },
  { name: "@chakra-ui/react", version: "^2.8.2", category: "runtime" },
  { name: "@emotion/react", version: "^11.11.4", category: "runtime" },
  { name: "@emotion/styled", version: "^11.11.5", category: "runtime" },
  { name: "framer-motion", version: "^10.16.16", category: "runtime" },
  { name: "zustand", version: "^4.5.2", category: "runtime" },
  { name: "zod", version: "^3.23.8", category: "runtime" },
  { name: "react-hook-form", version: "^7.51.0", category: "runtime" },
  { name: "nuqs", version: "^1.19.0", category: "runtime" },
];

const devDependencies: Library[] = [
  { name: "typescript", version: "^5.4.5", category: "dev" },
  { name: "vitest", version: "^1.6.0", category: "dev" },
  { name: "@vitest/coverage-v8", version: "^1.6.0", category: "dev" },
  { name: "@playwright/test", version: "^1.44.0", category: "dev" },
  { name: "@testing-library/react", version: "^14.2.1", category: "dev" },
  { name: "@testing-library/jest-dom", version: "^6.4.2", category: "dev" },
  { name: "@testing-library/user-event", version: "^14.5.2", category: "dev" },
  { name: "eslint", version: "^8.57.0", category: "dev" },
  { name: "eslint-config-next", version: "^14.2.0", category: "dev" },
  { name: "@typescript-eslint/parser", version: "^7.6.0", category: "dev" },
  { name: "@typescript-eslint/eslint-plugin", version: "^7.6.0", category: "dev" },
  { name: "eslint-plugin-react-hooks", version: "^4.6.0", category: "dev" },
  { name: "prettier", version: "^3.2.5", category: "dev" },
  { name: "tailwindcss", version: "^3.4.3", category: "dev" },
  { name: "postcss", version: "^8.4.38", category: "dev" },
  { name: "autoprefixer", version: "^10.4.19", category: "dev" },
  { name: "@types/node", version: "^20.12.0", category: "dev" },
  { name: "@types/react", version: "^18.3.0", category: "dev" },
  { name: "@types/react-dom", version: "^18.3.0", category: "dev" },
  { name: "jsdom", version: "^24.0.0", category: "dev" },
];

function LibraryCard({ name, version }: { name: string; version: string }) {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      _hover={{ shadow: "md", borderColor: "blue.300" }}
      transition="all 0.2s"
    >
      <HStack justify="space-between" align="center">
        <Code fontSize="sm" colorScheme="blue">
          {name}
        </Code>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {version}
        </Text>
      </HStack>
    </Box>
  );
}

export default function AboutPage() {
  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            About This Boilerplate
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            A production-ready Next.js boilerplate with modern tooling and best practices.
          </Text>
          <Link href="/">
            <Button colorScheme="blue" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Runtime Dependencies
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={4}>
            Core libraries used in production builds
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {dependencies.map((lib) => (
              <LibraryCard key={lib.name} name={lib.name} version={lib.version} />
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Development Dependencies
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={4}>
            Tools and libraries used during development
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {devDependencies.map((lib) => (
              <LibraryCard key={lib.name} name={lib.name} version={lib.version} />
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Tech Stack Summary
          </Heading>
          <VStack align="stretch" spacing={3}>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Framework:
              </Text>
              <Code>Next.js 14.2.0</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Runtime:
              </Text>
              <Code>React 18.3.1</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Language:
              </Text>
              <Code>TypeScript 5.4.5</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                UI Library:
              </Text>
              <Code>Chakra UI 2.8.2</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Styling:
              </Text>
              <Code>Tailwind CSS 3.4.3</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                State Management:
              </Text>
              <Code>Zustand 4.5.2</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Validation:
              </Text>
              <Code>Zod 3.23.8</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Testing:
              </Text>
              <Code>Vitest 1.6.0 + Playwright 1.44.0</Code>
            </HStack>
            <HStack>
              <Text fontWeight="semibold" minW="200px">
                Package Manager:
              </Text>
              <Code>Bun</Code>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
