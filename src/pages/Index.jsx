import React, { useState, useEffect } from "react";
import { Box, Container, Heading, SimpleGrid, Text, Image, VStack, HStack, IconButton, useColorModeValue, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaHeart, FaSpotify } from "react-icons/fa";

// Mock data representing new releases, in real scenario, this would be fetched from Spotify API
const mockNewReleases = [
  {
    id: "1",
    name: "Album One",
    artist: "Artist A",
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHx8MTcwODYzNzgxNHww&ixlib=rb-4.0.3&q=80&w=1080',
    releaseDate: "2023-04-01",
  },
  {
    id: "2",
    name: "Song Two",
    artist: "Artist B",
    imageUrl: 'https://images.unsplash.com/photo-1619983081593-e2ba5b543168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHx8MTcwODYzNzgxNHww&ixlib=rb-4.0.3&q=80&w=1080',
    releaseDate: "2023-04-02",
  },
  // Add more mock items as needed...
];

const Index = () => {
  // State to hold the new releases (in real app this would come from an API)
  const [newReleases, setNewReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data from API
    setTimeout(() => {
      setNewReleases(mockNewReleases);
      setIsLoading(false);
    }, 2000);

    // In a real scenario, you would handle API errors here
    // setError('Failed to fetch new releases.');
  }, []);

  const cardBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={5}>
        <Heading as="h1" size="xl" textAlign="center">
          New Releases from Artists You Follow
        </Heading>
        <HStack>
          <FaSpotify color="green" />
          <Text>Powered by Spotify</Text>
        </HStack>
      </VStack>

      {isLoading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={10}>
          {newReleases.map((release) => (
            <Box key={release.id} p={5} shadow="md" borderWidth="1px" bg={cardBg} borderRadius="lg" position="relative">
              <VStack>
                <Image src={release.imageUrl} borderRadius="lg" boxSize="200px" objectFit="cover" alt={`Cover for ${release.name}`} />
                <Heading as="h3" size="md" mt={2}>
                  {release.name}
                </Heading>
                <Text fontWeight="bold">{release.artist}</Text>
                <Text fontSize="sm" color="gray.500">
                  Released on: {release.releaseDate}
                </Text>
              </VStack>
              <IconButton aria-label={`Like ${release.name}`} icon={<FaHeart />} position="absolute" top={2} right={2} variant="ghost" />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Index;
